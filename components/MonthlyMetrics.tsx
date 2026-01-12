'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, TrendingUp, TrendingDown } from 'lucide-react';

interface MonthlyMetric {
  month: string;
  analyses: number;
  avgScore: number;
  improvement: number;
}

interface MonthlyMetricsProps {
  data: MonthlyMetric[];
}

export function MonthlyMetrics({ data }: MonthlyMetricsProps) {
  const latestMonth = data[data.length - 1];
  const previousMonth = data[data.length - 2];

  const analysesChange = previousMonth 
    ? ((latestMonth.analyses - previousMonth.analyses) / previousMonth.analyses) * 100
    : 0;

  const scoreChange = previousMonth
    ? latestMonth.avgScore - previousMonth.avgScore
    : 0;

  return (
    <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <CalendarDays className="w-5 h-5 text-CodeSensor-Primary" />
          Monthly Progress
        </CardTitle>
        <p className="text-sm text-gray-400 mt-1">Your activity this month</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Month Stats */}
        <div className="grid grid-cols-2 gap-4">
          {/* Analyses Count */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">Analyses</p>
              {analysesChange !== 0 && (
                <div className={`flex items-center gap-1 text-xs ${
                  analysesChange > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {analysesChange > 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span>{Math.abs(analysesChange).toFixed(0)}%</span>
                </div>
              )}
            </div>
            <div className="text-3xl font-bold text-white">
              {latestMonth.analyses}
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                style={{ width: `${Math.min((latestMonth.analyses / 20) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Average Score */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">Avg Score</p>
              {scoreChange !== 0 && (
                <div className={`flex items-center gap-1 text-xs ${
                  scoreChange > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {scoreChange > 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span>{Math.abs(scoreChange).toFixed(1)}</span>
                </div>
              )}
            </div>
            <div className="text-3xl font-bold text-white">
              {latestMonth.avgScore.toFixed(0)}
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-gradient-to-r from-CodeSensor-Secondary to-CodeSensor-Primary"
                style={{ width: `${latestMonth.avgScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Monthly Timeline */}
        <div className="space-y-2">
          <p className="text-sm text-gray-400">Last 6 Months</p>
          <div className="flex items-end gap-2 h-24">
            {data.slice(-6).map((month, index) => {
              const maxAnalyses = Math.max(...data.slice(-6).map(m => m.analyses));
              const height = maxAnalyses > 0 ? (month.analyses / maxAnalyses) * 100 : 0;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full relative">
                    <div 
                      className="w-full bg-gradient-to-t from-CodeSensor-Primary to-blue-500 rounded-t-lg transition-all group-hover:opacity-80 cursor-pointer"
                      style={{ height: `${Math.max(height, 10)}%` }}
                    />
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 hidden group-hover:block">
                      <div className="bg-gray-900 border border-gray-700 rounded px-2 py-1 text-xs whitespace-nowrap">
                        <p className="text-white font-semibold">{month.analyses} analyses</p>
                        <p className="text-gray-400">Score: {month.avgScore.toFixed(0)}</p>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{month.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Improvement Indicator */}
        {latestMonth.improvement !== 0 && (
          <div className={`p-3 rounded-lg border ${
            latestMonth.improvement > 0 
              ? 'bg-green-500/10 border-green-500/30' 
              : 'bg-red-500/10 border-red-500/30'
          }`}>
            <div className="flex items-center gap-2">
              {latestMonth.improvement > 0 ? (
                <TrendingUp className="w-4 h-4 text-green-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400" />
              )}
              <p className={`text-sm font-medium ${
                latestMonth.improvement > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {latestMonth.improvement > 0 ? 'Great progress!' : 'Keep improving!'}
              </p>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Your code quality has {latestMonth.improvement > 0 ? 'improved' : 'decreased'} by{' '}
              <span className="font-semibold">{Math.abs(latestMonth.improvement).toFixed(1)} points</span> this month
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
