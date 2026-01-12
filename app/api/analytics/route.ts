import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/authOptions';
import { supabaseAdmin } from '@/lib/supabase/serverClient';
import { startOfDay, subDays, format, startOfMonth, subMonths, eachDayOfInterval } from 'date-fns';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = supabaseAdmin;

    // Get user's repositories
    const { data: repositories } = await supabase
      .from('repositories')
      .select('id')
      .eq('user_email', session.user.email);

    if (!repositories || repositories.length === 0) {
      return NextResponse.json({
        trends: [],
        topRepositories: [],
        activityHeatmap: [],
        monthlyMetrics: []
      });
    }

    const repoIds = repositories.map(r => r.id);

    // Fetch all analyses for the user's repositories
    const { data: analyses } = await supabase
      .from('repository_analyses')
      .select(`
        id,
        repository_id,
        overall_score,
        quality_score,
        security_score,
        structure_score,
        created_at,
        repositories!inner(id, name, full_name, language)
      `)
      .in('repository_id', repoIds)
      .order('created_at', { ascending: false })
      .limit(1000);

    if (!analyses || analyses.length === 0) {
      return NextResponse.json({
        trends: [],
        topRepositories: [],
        activityHeatmap: [],
        monthlyMetrics: []
      });
    }

    // 1. Calculate Trends (last 30 days)
    const thirtyDaysAgo = subDays(new Date(), 30);
    const recentAnalyses = analyses.filter(a => new Date(a.created_at) >= thirtyDaysAgo);
    
    const trendsByDate = new Map<string, { scores: number[], count: number }>();
    recentAnalyses.forEach(analysis => {
      const date = format(new Date(analysis.created_at), 'MMM dd');
      const current = trendsByDate.get(date) || { scores: [], count: 0 };
      current.scores.push(analysis.overall_score);
      current.count += 1;
      trendsByDate.set(date, current);
    });

    const trends = Array.from(trendsByDate.entries()).map(([date, data]) => ({
      date,
      avgScore: Math.round(data.scores.reduce((a, b) => a + b, 0) / data.scores.length),
      analyses: data.count
    })).slice(-14); // Last 14 days

    // 2. Top Repositories
    const repoScores = new Map<number, { 
      scores: number[], 
      repo: any, 
      latestScore: number,
      previousScore?: number 
    }>();

    analyses.forEach(analysis => {
      const repoId = analysis.repository_id;
      const current = repoScores.get(repoId);
      
      if (!current) {
        repoScores.set(repoId, {
          scores: [analysis.overall_score],
          repo: analysis.repositories,
          latestScore: analysis.overall_score
        });
      } else {
        current.scores.push(analysis.overall_score);
        if (!current.previousScore) {
          current.previousScore = analysis.overall_score;
        }
      }
    });

    const topRepositories = Array.from(repoScores.entries())
      .map(([id, data]) => {
        let trend: 'up' | 'down' | 'stable' = 'stable';
        if (data.previousScore) {
          const diff = data.latestScore - data.previousScore;
          if (diff > 5) trend = 'up';
          else if (diff < -5) trend = 'down';
        }

        return {
          id: data.repo.id,
          name: data.repo.name,
          full_name: data.repo.full_name,
          language: data.repo.language,
          latest_score: data.latestScore,
          trend
        };
      })
      .sort((a, b) => b.latest_score - a.latest_score)
      .slice(0, 5);

    // 3. Activity Heatmap (last 90 days)
    const ninetyDaysAgo = subDays(new Date(), 90);
    const days = eachDayOfInterval({ start: ninetyDaysAgo, end: new Date() });
    
    const activityByDate = new Map<string, number>();
    analyses.forEach(analysis => {
      const analysisDate = startOfDay(new Date(analysis.created_at));
      if (analysisDate >= ninetyDaysAgo) {
        const dateStr = format(analysisDate, 'yyyy-MM-dd');
        activityByDate.set(dateStr, (activityByDate.get(dateStr) || 0) + 1);
      }
    });

    const activityHeatmap = days.map(day => {
      const dateStr = format(day, 'yyyy-MM-dd');
      const count = activityByDate.get(dateStr) || 0;
      let level = 0;
      if (count >= 7) level = 4;
      else if (count >= 5) level = 3;
      else if (count >= 3) level = 2;
      else if (count >= 1) level = 1;

      return {
        date: format(day, 'MMM dd'),
        count,
        level
      };
    });

    // 4. Monthly Metrics (last 6 months)
    const monthlyData = new Map<string, { scores: number[], count: number }>();
    
    for (let i = 5; i >= 0; i--) {
      const month = subMonths(new Date(), i);
      const monthKey = format(month, 'MMM');
      monthlyData.set(monthKey, { scores: [], count: 0 });
    }

    analyses.forEach(analysis => {
      const monthKey = format(new Date(analysis.created_at), 'MMM');
      const data = monthlyData.get(monthKey);
      if (data) {
        data.scores.push(analysis.overall_score);
        data.count += 1;
      }
    });

    const monthlyMetrics = Array.from(monthlyData.entries()).map(([month, data], index, arr) => {
      const avgScore = data.scores.length > 0
        ? data.scores.reduce((a, b) => a + b, 0) / data.scores.length
        : 0;

      let improvement = 0;
      if (index > 0) {
        const prevData = arr[index - 1][1];
        const prevAvg = prevData.scores.length > 0
          ? prevData.scores.reduce((a, b) => a + b, 0) / prevData.scores.length
          : 0;
        improvement = avgScore - prevAvg;
      }

      return {
        month,
        analyses: data.count,
        avgScore: Math.round(avgScore),
        improvement: Math.round(improvement * 10) / 10
      };
    });

    return NextResponse.json({
      trends,
      topRepositories,
      activityHeatmap,
      monthlyMetrics
    });

  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
