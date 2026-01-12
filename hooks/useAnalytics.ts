import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface AnalyticsData {
  trends: Array<{
    date: string;
    avgScore: number;
    analyses: number;
  }>;
  topRepositories: Array<{
    id: number;
    name: string;
    full_name: string;
    language: string | null;
    latest_score: number;
    trend: 'up' | 'down' | 'stable';
  }>;
  activityHeatmap: Array<{
    date: string;
    count: number;
    level: number;
  }>;
  monthlyMetrics: Array<{
    month: string;
    analyses: number;
    avgScore: number;
    improvement: number;
  }>;
}

export function useAnalytics() {
  const { data: session } = useSession();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user) {
      fetchAnalytics();
    }
  }, [session]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/analytics');
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }

      const data = await response.json();
      setAnalytics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return {
    analytics,
    loading,
    error,
    refetch: fetchAnalytics
  };
}
