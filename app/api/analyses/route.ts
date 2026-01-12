import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { supabaseAdmin } from '@/lib/supabase/serverClient';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get all user analyses with repository information
    const { data: analyses, error: analysesError } = await supabaseAdmin
      .from('repository_analyses')
      .select(`
        *,
        repository:repositories (
          id,
          name,
          full_name,
          description
        )
      `)
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (analysesError) {
      console.error('Error fetching analyses:', analysesError);
      return NextResponse.json(
        { error: 'Failed to fetch analyses' },
        { status: 500 }
      );
    }

    // Calculate statistics
    const total = analyses?.length || 0;
    
    // Analyses from this week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const thisWeek = analyses?.filter(a => 
      new Date(a.created_at) >= oneWeekAgo
    ).length || 0;

    // Unique analyzed repositories
    const uniqueRepos = new Set(analyses?.map(a => a.repository_id)).size;

    // Average time (simulated for now - in the future you can store duration)
    const avgDuration = 2.5; // minutes

    const stats = {
      total,
      thisWeek,
      avgDuration,
      repositories: uniqueRepos,
    };

    return NextResponse.json({
      analyses: analyses || [],
      stats,
    });

  } catch (error) {
    console.error('Error in analyses API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
