'use client';

import { useRepositories } from '@/hooks/useRepositories';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Github, Star, GitFork, Lock, Code, ExternalLink, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ReposPage() {
  const { repositories, loading, error } = useRepositories();
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState<string>('all');

  // Get unique languages
  const languages = ['all', ...new Set(repositories.map(repo => repo.language).filter((lang): lang is string => Boolean(lang)))];

  // Filter repositories
  const filteredRepos = repositories.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         repo.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = languageFilter === 'all' || repo.language === languageFilter;
    return matchesSearch && matchesLanguage;
  });

  if (loading) {
    return (
      <div className="p-6 md:p-8 lg:p-10 space-y-6">
        <div className="animate-pulse space-y-6">
          <div className="h-12 bg-gray-800/50 rounded-lg w-64"></div>
          <div className="h-10 bg-gray-800/50 rounded-lg w-full max-w-md"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-800/50 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 md:p-8 lg:p-10">
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4">
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 lg:p-10 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
          All Repositories
        </h1>
        <p className="text-gray-400">
          Browse and manage all your GitHub repositories
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search repositories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-CodeSensor-Primary/50 transition-colors"
          />
        </div>

        {/* Language Filter */}
        <div className="relative min-w-[200px]">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-CodeSensor-Primary/50 transition-colors appearance-none cursor-pointer"
          >
            {languages.map(lang => (
              <option key={lang} value={lang} className="bg-gray-900">
                {lang === 'all' ? 'All Languages' : lang}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          Showing <span className="text-white font-medium">{filteredRepos.length}</span> of{' '}
          <span className="text-white font-medium">{repositories.length}</span> repositories
        </p>
      </div>

      {/* Repositories Grid */}
      {filteredRepos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {filteredRepos.map((repo) => (
            <Card
              key={repo.id}
              className="group relative backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800 hover:border-CodeSensor-Primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-CodeSensor-Primary/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-CodeSensor-Secondary/0 to-CodeSensor-Primary/0 group-hover:from-CodeSensor-Secondary/5 group-hover:to-CodeSensor-Primary/5 rounded-xl transition-all duration-300" />
              
              <div className="relative p-6 space-y-4">
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
                    <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed min-h-[40px]">
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

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Link href={`/dashboard/repos/${repo.id}`} className="flex-1">
                    <Button 
                      className="w-full bg-gradient-to-r from-CodeSensor-Secondary to-CodeSensor-Primary hover:opacity-90"
                      size="sm"
                    >
                      Analyze
                    </Button>
                  </Link>
                  {repo.html_url && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-800 hover:border-CodeSensor-Primary/50 bg-transparent text-white"
                      onClick={() => window.open(repo.html_url, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="backdrop-blur-xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800 rounded-2xl p-12 max-w-md mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-300 mb-3">
              No repositories found
            </h3>
            <p className="text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
