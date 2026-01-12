import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface Analysis {
  id: string;
  created_at: string;
  quality_score: number;
  security_score: number;
  structure_score: number;
  overall_score: number;
  analysis_data: any;
}

interface ComparisonData {
  current: Analysis | null;
  previous: Analysis | null;
  history: Analysis[];
  improvements: {
    quality: number;
    security: number;
    structure: number;
    overall: number;
  };
  trend: 'improving' | 'declining' | 'stable';
}

export function useAnalysisComparison(repositoryId: string) {
  const { data: session } = useSession();
  const [comparison, setComparison] = useState<ComparisonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.user?.id || !repositoryId) return;

    const fetchAnalysisHistory = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/repositories/${repositoryId}/analyze`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch analysis history');
        }

        const result = await response.json();
        const analyses: Analysis[] = result.data || [];

        if (analyses.length === 0) {
          setComparison(null);
          return;
        }

        const current = analyses[0];
        const previous = analyses[1] || null;

        // Calculate improvements
        const improvements = {
          quality: previous ? current.quality_score - previous.quality_score : 0,
          security: previous ? current.security_score - previous.security_score : 0,
          structure: previous ? current.structure_score - previous.structure_score : 0,
          overall: previous ? current.overall_score - previous.overall_score : 0,
        };

        // Determine trend
        let trend: 'improving' | 'declining' | 'stable' = 'stable';
        if (improvements.overall > 2) trend = 'improving';
        else if (improvements.overall < -2) trend = 'declining';

        setComparison({
          current,
          previous,
          history: analyses,
          improvements,
          trend,
        });

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysisHistory();
  }, [session?.user?.id, repositoryId]);

  return { comparison, loading, error };
}
