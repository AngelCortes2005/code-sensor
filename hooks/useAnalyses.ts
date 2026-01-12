import { useState, useEffect } from 'react';

export interface Analysis {
  id: number;
  repository_id: number;
  quality_score: number;
  security_score: number;
  structure_score: number;
  overall_score: number;
  status: string;
  created_at: string;
  updated_at: string;
  analysis_data: any;
  repository?: {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
  };
}

export interface AnalysesStats {
  total: number;
  thisWeek: number;
  avgDuration: number;
  repositories: number;
}

export function useAnalyses() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [stats, setStats] = useState<AnalysesStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const fetchAnalyses = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/analyses');
      
      if (!response.ok) {
        throw new Error('Failed to fetch analyses');
      }

      const data = await response.json();
      setAnalyses(data.analyses || []);
      setStats(data.stats || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching analyses:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    analyses,
    stats,
    loading,
    error,
    refetch: fetchAnalyses,
  };
}
