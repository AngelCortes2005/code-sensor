'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X, Github } from 'lucide-react';

interface Repository {
  id: number;
  name: string;
  full_name: string;
  language: string | null;
  latest_score?: number;
}

interface RepositorySelectorProps {
  onSelect: (repo: Repository) => void;
  onClose: () => void;
  excludeIds?: number[];
}

export function RepositorySelector({ onSelect, onClose, excludeIds = [] }: RepositorySelectorProps) {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRepositories();
  }, []);

  useEffect(() => {
    if (search) {
      setFilteredRepos(
        repositories.filter(repo =>
          repo.name.toLowerCase().includes(search.toLowerCase()) ||
          repo.full_name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredRepos(repositories);
    }
  }, [search, repositories]);

  const fetchRepositories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/repositories');
      if (response.ok) {
        const result = await response.json();
        const data = result.data || result;
        // Filter out excluded repos
        const filtered = Array.isArray(data) 
          ? data.filter((repo: Repository) => !excludeIds.includes(repo.id))
          : [];
        setRepositories(filtered);
        setFilteredRepos(filtered);
      }
    } catch (error) {
      console.error('Failed to fetch repositories:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl backdrop-blur-xl bg-gradient-to-br from-gray-900/95 to-black/95 border-gray-800">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Select Repository</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-gray-800"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search repositories..."
              className="pl-10 bg-gray-900/50 border-gray-800 text-white placeholder:text-gray-500"
            />
          </div>

          {/* Repository List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {loading ? (
              <div className="text-center py-8 text-gray-400">
                <div className="w-8 h-8 border-4 border-CodeSensor-Primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                Loading repositories...
              </div>
            ) : filteredRepos.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                No repositories found
              </div>
            ) : (
              filteredRepos.map((repo) => (
                <div
                  key={repo.id}
                  onClick={() => onSelect(repo)}
                  className="p-4 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-CodeSensor-Primary/50 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <Github className="w-5 h-5 text-CodeSensor-Primary shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white truncate group-hover:text-CodeSensor-Primary transition-colors">
                          {repo.name}
                        </p>
                        {repo.language && (
                          <p className="text-xs text-gray-400">{repo.language}</p>
                        )}
                      </div>
                    </div>
                    {repo.latest_score !== undefined && (
                      <div className="px-3 py-1 rounded-full bg-CodeSensor-Primary/10 border border-CodeSensor-Primary/30">
                        <span className="text-sm font-bold text-CodeSensor-Primary">
                          {repo.latest_score}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
