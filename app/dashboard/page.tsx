'use client';

import { useSession } from 'next-auth/react';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { useRepositories } from '@/hooks/useRepositories';
import { Button } from '@/components/ui/button';
import { RefreshCw, Github, Star, GitFork, Lock } from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardPage() {
  const { data: session } = useSession();
  const { repositories, loading, syncing, syncRepositories, error } = useRepositories();

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-400">You need to sign in first.</p>
      </div>
    );
  }

  const user = session?.user;

  const handleSync = async () => {
    try {
      await syncRepositories();
    } catch (error) {
      console.error('Sync failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-black p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              My Repositories
            </h1>
            <p className="text-gray-400 mt-2">
              Manage and analyze your GitHub repositories
            </p>
          </div>

          <Button
            onClick={handleSync}
            disabled={syncing}
            className="bg-gradient-to-r from-[#019A8E] to-CodeSensor-Primary hover:opacity-90"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing...' : 'Sync Repositories'}
          </Button>
        </header>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 rounded-2xl p-6 h-48" />
            ))}
          </div>
        )}

        {/* Repositories Grid */}
        {!loading && repositories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repositories.map((repo) => (
              <Link
                key={repo.id}
                href={`/dashboard/repos/${repo.id}`}
                className="group relative backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 rounded-2xl p-6 hover:border-CodeSensor-Primary/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#019A8E]/5 to-CodeSensor-Primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Github className="w-5 h-5 text-CodeSensor-Primary" />
                      {repo.is_private && (
                        <Lock className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    {repo.language && (
                      <span className="px-2 py-1 rounded-full bg-CodeSensor-Primary/10 text-CodeSensor-Primary text-xs">
                        {repo.language}
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-CodeSensor-Primary transition-colors">
                      {repo.name}
                    </h3>
                    {repo.description && (
                      <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                        {repo.description}
                      </p>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {repo.stars}
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="w-4 h-4" />
                      {repo.forks}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && repositories.length === 0 && (
          <div className="text-center py-20">
            <Github className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-300 mb-2">
              No repositories found
            </h3>
            <p className="text-gray-400 mb-6">
              Click the sync button to load your GitHub repositories
            </p>
            <Button onClick={handleSync} disabled={syncing}>
              <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
              Sync Now
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
