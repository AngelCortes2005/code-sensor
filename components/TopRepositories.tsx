'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface Repository {
  id: number;
  name: string;
  full_name: string;
  language: string | null;
  latest_score?: number;
  trend?: 'up' | 'down' | 'stable';
}

interface TopRepositoriesProps {
  repositories: Repository[];
}

export function TopRepositories({ repositories }: TopRepositoriesProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-blue-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-500/10 border-green-500/30';
    if (score >= 70) return 'bg-blue-500/10 border-blue-500/30';
    if (score >= 50) return 'bg-yellow-500/10 border-yellow-500/30';
    return 'bg-red-500/10 border-red-500/30';
  };

  const getTrendIcon = (trend?: string) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (trend === 'down') return <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />;
    return null;
  };

  return (
    <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Trophy className="w-5 h-5 text-yellow-400" />
          Top Repositories
        </CardTitle>
        <p className="text-sm text-gray-400 mt-1">Your best performing repositories</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {repositories.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Trophy className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">No analyzed repositories yet</p>
          </div>
        ) : (
          repositories.map((repo, index) => (
            <Link
              key={repo.id}
              href={`/dashboard/repos/${repo.id}`}
              className="block"
            >
              <div className="group flex items-center gap-4 p-3 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-CodeSensor-Primary/50 transition-all">
                {/* Rank Badge */}
                <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                  index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                  index === 1 ? 'bg-gray-400/20 text-gray-300' :
                  index === 2 ? 'bg-orange-500/20 text-orange-400' :
                  'bg-gray-800 text-gray-400'
                }`}>
                  {index + 1}
                </div>

                {/* Repository Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white truncate group-hover:text-CodeSensor-Primary transition-colors">
                    {repo.name}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    {repo.language && (
                      <>
                        <span className="w-2 h-2 rounded-full bg-CodeSensor-Primary"></span>
                        <span>{repo.language}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Score */}
                {repo.latest_score !== undefined && (
                  <div className="flex items-center gap-2">
                    {getTrendIcon(repo.trend)}
                    <div className={`px-3 py-1.5 rounded-full border ${getScoreBgColor(repo.latest_score)}`}>
                      <span className={`font-bold text-sm ${getScoreColor(repo.latest_score)}`}>
                        {repo.latest_score}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))
        )}
      </CardContent>
    </Card>
  );
}
