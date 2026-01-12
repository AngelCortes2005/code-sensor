'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus, X, BarChart3, FileText, Download } from 'lucide-react';
import { RepositorySelector } from '@/components/RepositorySelector';
import { ComparisonTable } from '@/components/ComparisonTable';
import { ComparisonCharts } from '@/components/ComparisonCharts';

interface Repository {
  id: number;
  name: string;
  full_name: string;
  language: string | null;
  latest_score?: number;
  latest_analysis?: any;
}

export default function ComparisonPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [selectedRepos, setSelectedRepos] = useState<Repository[]>([]);
  const [showSelector, setShowSelector] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddRepository = (repo: Repository) => {
    if (selectedRepos.length >= 4) {
      alert('You can compare up to 4 repositories');
      return;
    }
    if (!selectedRepos.find(r => r.id === repo.id)) {
      setSelectedRepos([...selectedRepos, repo]);
    }
    setShowSelector(false);
  };

  const handleRemoveRepository = (repoId: number) => {
    setSelectedRepos(selectedRepos.filter(r => r.id !== repoId));
  };

  const handleExportComparison = () => {
    // Create CSV export
    const headers = ['Repository', 'Overall Score', 'Quality', 'Security', 'Structure', 'Language'];
    const rows = selectedRepos.map(repo => [
      repo.name,
      repo.latest_analysis?.overall_score || 'N/A',
      repo.latest_analysis?.quality_score || 'N/A',
      repo.latest_analysis?.security_score || 'N/A',
      repo.latest_analysis?.structure_score || 'N/A',
      repo.language || 'N/A',
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `repository-comparison-${Date.now()}.csv`;
    a.click();
  };

  if (!session) {
    return (
      <div className="p-6 md:p-8 lg:p-10">
        <p className="text-gray-400">Please sign in to compare repositories.</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 lg:p-10 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.back()}
              className="border-gray-800 hover:border-CodeSensor-Primary/50 bg-transparent text-white"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Repository Comparison
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Compare up to 4 repositories side by side
              </p>
            </div>
          </div>

          {selectedRepos.length >= 2 && (
            <Button
              onClick={handleExportComparison}
              variant="outline"
              className="border-gray-800 hover:border-CodeSensor-Primary/50 bg-transparent text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          )}
        </div>

        {/* Selected Repositories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {selectedRepos.map((repo) => (
            <Card
              key={repo.id}
              className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800 relative"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveRepository(repo.id)}
                className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-red-500/20 hover:text-red-400"
              >
                <X className="w-4 h-4" />
              </Button>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-white truncate pr-6">
                  {repo.name}
                </CardTitle>
                {repo.language && (
                  <p className="text-xs text-gray-400">{repo.language}</p>
                )}
              </CardHeader>
              <CardContent>
                {repo.latest_score !== undefined ? (
                  <div className="text-center">
                    <div className="text-3xl font-bold text-CodeSensor-Primary">
                      {repo.latest_score}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Overall Score</p>
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 text-center">No analysis yet</p>
                )}
              </CardContent>
            </Card>
          ))}

          {/* Add Repository Button */}
          {selectedRepos.length < 4 && (
            <Card
              onClick={() => setShowSelector(true)}
              className="backdrop-blur-xl bg-gradient-to-br from-gray-900/50 to-black/50 border-gray-800 border-dashed cursor-pointer hover:border-CodeSensor-Primary/50 transition-all"
            >
              <CardContent className="h-full flex flex-col items-center justify-center p-6 space-y-2">
                <div className="w-12 h-12 rounded-full bg-CodeSensor-Primary/10 flex items-center justify-center">
                  <Plus className="w-6 h-6 text-CodeSensor-Primary" />
                </div>
                <p className="text-sm font-medium text-gray-400">Add Repository</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Comparison Content */}
        {selectedRepos.length >= 2 ? (
          <div className="space-y-6">
            {/* Comparison Table */}
            <ComparisonTable repositories={selectedRepos} />

            {/* Comparison Charts */}
            <ComparisonCharts repositories={selectedRepos} />
          </div>
        ) : (
          <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800">
            <CardContent className="p-12 text-center">
              <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                Add repositories to compare
              </h3>
              <p className="text-gray-400 mb-6">
                Select at least 2 repositories to see detailed comparisons
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Repository Selector Modal */}
      {showSelector && (
        <RepositorySelector
          onSelect={handleAddRepository}
          onClose={() => setShowSelector(false)}
          excludeIds={selectedRepos.map(r => r.id)}
        />
      )}
    </div>
  );
}
