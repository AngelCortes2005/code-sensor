import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface Repository {
  id: number;
  user_id: string;
  github_id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  is_private: boolean;
  html_url: string;
  created_at: string;
  updated_at: string;
}

export function useRepository(repoId: number | null) {
  const { data: session } = useSession();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.user?.id || !repoId) {
      setLoading(false);
      return;
    }

    const fetchRepository = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/repositories/${repoId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch repository');
        }

        const result = await response.json();
        setRepository(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRepository();
  }, [session?.user?.id, repoId]);

  return { repository, loading, error };
}