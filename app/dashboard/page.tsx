'use client';

import { useSession } from 'next-auth/react';
import { useRepositories } from '@/hooks/useRepositories';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, Github, Star, GitFork, Lock, TrendingUp, Code, Eye } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session } = useSession();
  const { repositories, loading, syncing, syncRepositories, error } = useRepositories();

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <Github className="w-16 h-16 text-gray-600 mx-auto" />
          <p className="text-lg text-gray-400">You need to sign in first.</p>
        </div>
      </div>
    );
  }

  const handleSync = async () => {
    try {
      await syncRepositories();
    } catch (error) {
      console.error('Sync failed:', error);
    }
  };

  // Calculate stats
  const totalStars = repositories.reduce((acc, repo) => acc + (repo.stars || 0), 0);
  const totalForks = repositories.reduce((acc, repo) => acc + (repo.forks || 0), 0);
  const privateRepos = repositories.filter(repo => repo.is_private).length;
  const publicRepos = repositories.length - privateRepos;

  const stats = [
    { 
      title: 'Total Repositories', 
      value: repositories.length, 
      icon: <Github className="w-6 h-6" />,
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      title: 'Total Stars', 
      value: totalStars, 
      icon: <Star className="w-6 h-6" />,
      gradient: 'from-yellow-500 to-orange-500'
    },
    { 
      title: 'Total Forks', 
      value: totalForks, 
      icon: <GitFork className="w-6 h-6" />,
      gradient: 'from-green-500 to-emerald-500'
    },
    { 
      title: 'Public / Private', 
      value: `${publicRepos} / ${privateRepos}`, 
      icon: <Lock className="w-6 h-6" />,
      gradient: 'from-purple-500 to-pink-500'
    },
  ];

  return (
    <div className="p-6 md:p-8 lg:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-gray-400 mt-2">
            Monitor and analyze your GitHub repositories
          </p>
        </div>

        <Button
          onClick={handleSync}
          disabled={syncing || loading}
          className="bg-gradient-to-r from-[#019A8E] to-CodeSensor-Primary hover:opacity-90 transition-all shadow-lg hover:shadow-CodeSensor-Primary/50"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
          {syncing ? 'Syncing...' : 'Sync Repositories'}
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 backdrop-blur-xl">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Stats Grid */}
      {!loading && repositories.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border-gray-800 hover:border-gray-700 transition-all"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient} bg-opacity-10`}>
                  <div className={`bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`}>
                    {stat.icon}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 rounded-xl h-32" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 rounded-xl h-48" />
            ))}
          </div>
        </div>
      )}

      {/* Recent Repositories */}
      {!loading && repositories.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Recent Repositories</h2>
            <Link href="/dashboard/repos">
              <Button variant="outline" className="border-gray-800 hover:border-CodeSensor-Primary/50 bg-transparent">
                View All
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {repositories.slice(0, 6).map((repo) => (
              <Link
                key={repo.id}
                href={`/dashboard/repos/${repo.id}`}
                className="group relative backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-black/90 border border-gray-800 rounded-xl p-6 hover:border-CodeSensor-Primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-CodeSensor-Primary/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#019A8E]/0 to-CodeSensor-Primary/0 group-hover:from-[#019A8E]/5 group-hover:to-CodeSensor-Primary/5 rounded-xl transition-all duration-300" />
                
                <div className="relative space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="p-2 bg-CodeSensor-Primary/10 rounded-lg">
                        <Github className="w-4 h-4 text-CodeSensor-Primary" />
                      </div>
                      {repo.is_private && (
                        <div className="p-1 bg-gray-800/50 rounded">
                          <Lock className="w-3 h-3 text-gray-400" />
                        </div>
                      )}
                    </div>
                    {repo.language && (
                      <span className="px-3 py-1 rounded-full bg-CodeSensor-Primary/10 text-CodeSensor-Primary text-xs font-medium whitespace-nowrap">
                        {repo.language}
                      </span>
                    )}
                  </div>

                  {/* Name & Description */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-CodeSensor-Primary transition-colors line-clamp-1">
                      {repo.name}
                    </h3>
                    {repo.description && (
                      <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                        {repo.description}
                      </p>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-400 pt-2 border-t border-gray-800/50">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4" />
                      <span>{repo.stars}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <GitFork className="w-4 h-4" />
                      <span>{repo.forks}</span>
                    </div>
                    {repo.language && (
                      <div className="flex items-center gap-1.5 ml-auto">
                        <Code className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && repositories.length === 0 && (
        <div className="text-center py-20">
          <div className="backdrop-blur-xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800 rounded-2xl p-12 max-w-md mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <Github className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-300 mb-3">
              No repositories found
            </h3>
            <p className="text-gray-400 mb-8">
              Click the sync button to load your GitHub repositories and start analyzing your code
            </p>
            <Button 
              onClick={handleSync} 
              disabled={syncing}
              className="bg-gradient-to-r from-[#019A8E] to-CodeSensor-Primary hover:opacity-90"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
              Sync Now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
