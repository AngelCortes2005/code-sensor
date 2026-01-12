'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table } from 'lucide-react';

interface Repository {
  id: number;
  name: string;
  language: string | null;
  latest_analysis?: {
    overall_score: number;
    quality_score: number;
    security_score: number;
    structure_score: number;
    analysis_data?: {
      issues?: any[];
      vulnerabilities?: any[];
    };
  };
}

interface ComparisonTableProps {
  repositories: Repository[];
}

export function ComparisonTable({ repositories }: ComparisonTableProps) {
  const metrics = [
    { key: 'overall_score', label: 'Overall Score' },
    { key: 'quality_score', label: 'Quality Score' },
    { key: 'security_score', label: 'Security Score' },
    { key: 'structure_score', label: 'Structure Score' },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-blue-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-500/10';
    if (score >= 70) return 'bg-blue-500/10';
    if (score >= 50) return 'bg-yellow-500/10';
    return 'bg-red-500/10';
  };

  const getBestRepo = (metricKey: string) => {
    let best = -1;
    let bestScore = -1;
    repositories.forEach((repo, index) => {
      const score = (repo.latest_analysis as any)?.[metricKey] || 0;
      if (score > bestScore) {
        bestScore = score;
        best = index;
      }
    });
    return best;
  };

  return (
    <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Table className="w-5 h-5 text-CodeSensor-Primary" />
          Score Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">
                  Metric
                </th>
                {repositories.map((repo) => (
                  <th key={repo.id} className="text-center py-3 px-4 text-sm font-semibold text-white">
                    <div className="truncate max-w-32">{repo.name}</div>
                    <div className="text-xs text-gray-400 font-normal mt-1">
                      {repo.language || 'N/A'}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric, metricIndex) => {
                const bestIndex = getBestRepo(metric.key);
                return (
                  <tr
                    key={metric.key}
                    className={metricIndex !== metrics.length - 1 ? 'border-b border-gray-800/50' : ''}
                  >
                    <td className="py-4 px-4 text-sm font-medium text-gray-300">
                      {metric.label}
                    </td>
                    {repositories.map((repo, repoIndex) => {
                      const score = (repo.latest_analysis as any)?.[metric.key] || 0;
                      const isBest = repoIndex === bestIndex && score > 0;
                      return (
                        <td key={repo.id} className="py-4 px-4 text-center">
                          {repo.latest_analysis ? (
                            <div className={`inline-flex items-center justify-center px-4 py-2 rounded-lg ${getScoreBgColor(score)} ${
                              isBest ? 'ring-2 ring-CodeSensor-Primary' : ''
                            }`}>
                              <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
                                {score}
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">N/A</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}

              {/* Additional Metrics */}
              <tr className="border-t-2 border-gray-800">
                <td className="py-4 px-4 text-sm font-medium text-gray-300">
                  Issues Found
                </td>
                {repositories.map((repo) => (
                  <td key={repo.id} className="py-4 px-4 text-center">
                    <span className="text-sm text-gray-400">
                      {repo.latest_analysis?.analysis_data?.issues?.length || 0}
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-4 text-sm font-medium text-gray-300">
                  Vulnerabilities
                </td>
                {repositories.map((repo) => (
                  <td key={repo.id} className="py-4 px-4 text-center">
                    <span className="text-sm text-red-400">
                      {repo.latest_analysis?.analysis_data?.vulnerabilities?.length || 0}
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center gap-4 text-xs text-gray-400 pt-4 border-t border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded ring-2 ring-CodeSensor-Primary"></div>
            <span>Best in category</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
