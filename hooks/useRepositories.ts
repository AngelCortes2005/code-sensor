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

export function useRepositories() {
  const { data: session } = useSession();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);

  // Fetch repositories
  const fetchRepositories = async () => {
    if (!session?.user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/repositories');
      
      if (!response.ok) {
        throw new Error('Failed to fetch repositories');
      }

      const result = await response.json();
      setRepositories(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Sync repositories from GitHub
  const syncRepositories = async () => {
    if (!session?.user?.id) return;

    setSyncing(true);
    setError(null);

    try {
      const response = await fetch('/api/repositories/sync', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to sync repositories');
      }

      const result = await response.json();
      
      // Refresh the list after sync
      await fetchRepositories();
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setSyncing(false);
    }
  };

  // Load repositories on mount
  useEffect(() => {
    if (session?.user?.id) {
      fetchRepositories();
    }
  }, [session?.user?.id]);

  return { 
    repositories, 
    loading, 
    error,
    syncing,
    syncRepositories,
    refetch: fetchRepositories
  };
}