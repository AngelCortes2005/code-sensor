'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnalysisResults } from '@/components/AnalysisResults';
import { 
  ArrowLeft, 
  Github, 
  Star, 
  GitFork, 
  Lock, 
  ExternalLink,
  Sparkles,
  Loader2,
  RefreshCw
} from 'lucide-react';

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  is_private: boolean;
  html_url: string;
}

interface Analysis {
  id: number;
  quality_score: number;
  security_score: number;
  structure_score: number;
  overall_score: number;
  analysis_data: any;
  created_at: string;
}

export default function RepositoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [repository, setRepository] = useState<Repository | null>(null);
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRepositoryData();
  }, [resolvedParams.id]);

  const fetchRepositoryData = async () => {
    try {
      setLoading(true);
      
      // Fetch repository info
      const repoResponse = await fetch(`/api/repositories/${resolvedParams.id}`);
      if (repoResponse.ok) {
        const repoData = await repoResponse.json();
        setRepository(repoData);
      }

      // Fetch analyses
      const analysesResponse = await fetch(`/api/repositories/${resolvedParams.id}/analyze`);
      if (analysesResponse.ok) {
        const analysesData = await analysesResponse.json();
        setAnalyses(analysesData.data || []);
      }
    } catch (err) {
      setError('Error loading data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    try {
      setAnalyzing(true);
      setError(null);

      const response = await fetch(`/api/repositories/${resolvedParams.id}/analyze`, {
        method: 'POST',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error analyzing repository');
      }

      const result = await response.json();
      
      // Refresh analyses
      await fetchRepositoryData();
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 md:p-8 lg:p-10">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-800 rounded w-1/4"></div>
            <div className="h-24 bg-gray-800 rounded"></div>
            <div className="h-64 bg-gray-800 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!repository) {
    return (
      <div className="p-6 md:p-8 lg:p-10">
        <div className="max-w-6xl mx-auto">
          <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800">
            <CardContent className="p-12 text-center">
              <p className="text-gray-400">Repository not found</p>
              <Button onClick={() => router.back()} className="mt-4">
                Go Back
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const latestAnalysis = analyses[0];

  return (
    <div className="p-6 md:p-8 lg:p-10 space-y-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="border-gray-800 hover:border-CodeSensor-Primary/50 bg-transparent text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Repository Detail
          </h1>
        </div>

        {/* Repository Info */}
        <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-CodeSensor-Primary/10 rounded-lg">
                    <Github className="w-6 h-6 text-CodeSensor-Primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{repository.name}</h2>
                    <p className="text-sm text-gray-400">{repository.full_name}</p>
                  </div>
                  {repository.is_private && (
                    <Lock className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                
                {repository.description && (
                  <p className="text-gray-300 mb-4">{repository.description}</p>
                )}

                <div className="flex items-center gap-6 text-sm text-gray-400">
                  {repository.language && (
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-CodeSensor-Primary"></span>
                      <span>{repository.language}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4" />
                    <span>{repository.stars}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GitFork className="w-4 h-4" />
                    <span>{repository.forks}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="bg-gradient-to-r from-[#019A8E] to-CodeSensor-Primary hover:opacity-90"
                >
                  {analyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      {latestAnalysis ? 'Analyze Again' : 'Analyze with AI'}
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open(repository.html_url, '_blank')}
                  className="border-gray-800 hover:border-CodeSensor-Primary/50 bg-transparent text-white"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on GitHub
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Card className="backdrop-blur-xl bg-red-500/10 border-red-500/50">
            <CardContent className="p-4">
              <p className="text-red-400">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Analysis Results */}
        {latestAnalysis ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Latest Analysis</h2>
              <p className="text-sm text-gray-400">
                {new Date(latestAnalysis.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <AnalysisResults analysis={latestAnalysis} />
          </div>
        ) : (
          <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800">
            <CardContent className="p-12 text-center">
              <Sparkles className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                No analysis available
              </h3>
              <p className="text-gray-400 mb-6">
                Click "Analyze with AI" to get a complete analysis of your repository
              </p>
              <Button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="bg-gradient-to-r from-[#019A8E] to-CodeSensor-Primary hover:opacity-90"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analizando...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Start Analysis
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Previous Analyses */}
        {analyses.length > 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Previous Analyses</h2>
            <div className="grid gap-4">
              {analyses.slice(1).map((analysis) => (
                <Card 
                  key={analysis.id}
                  className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border-gray-800 hover:border-gray-700 transition-all cursor-pointer"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">{analysis.overall_score}</div>
                          <p className="text-xs text-gray-400">Score</p>
                        </div>
                        <div className="h-8 w-px bg-gray-800"></div>
                        <div className="text-sm text-gray-400">
                          {new Date(analysis.created_at).toLocaleDateString('en-US')}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-800 hover:border-CodeSensor-Primary/50 bg-transparent"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
