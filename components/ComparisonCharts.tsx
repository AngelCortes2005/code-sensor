'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart3 } from 'lucide-react';

interface Repository {
  id: number;
  name: string;
  latest_analysis?: {
    overall_score: number;
    quality_score: number;
    security_score: number;
    structure_score: number;
  };
}

interface ComparisonChartsProps {
  repositories: Repository[];
}

export function ComparisonCharts({ repositories }: ComparisonChartsProps) {
  // Bar chart data
  const barData = repositories.map(repo => ({
    name: repo.name.length > 15 ? repo.name.substring(0, 15) + '...' : repo.name,
    overall: repo.latest_analysis?.overall_score || 0,
    quality: repo.latest_analysis?.quality_score || 0,
    security: repo.latest_analysis?.security_score || 0,
    structure: repo.latest_analysis?.structure_score || 0,
  }));

  // Radar chart data
  const radarData = [
    {
      metric: 'Overall',
      ...repositories.reduce((acc, repo, index) => ({
        ...acc,
        [`repo${index}`]: repo.latest_analysis?.overall_score || 0,
      }), {})
    },
    {
      metric: 'Quality',
      ...repositories.reduce((acc, repo, index) => ({
        ...acc,
        [`repo${index}`]: repo.latest_analysis?.quality_score || 0,
      }), {})
    },
    {
      metric: 'Security',
      ...repositories.reduce((acc, repo, index) => ({
        ...acc,
        [`repo${index}`]: repo.latest_analysis?.security_score || 0,
      }), {})
    },
    {
      metric: 'Structure',
      ...repositories.reduce((acc, repo, index) => ({
        ...acc,
        [`repo${index}`]: repo.latest_analysis?.structure_score || 0,
      }), {})
    },
  ];

  const colors = ['#00FE74', '#3b82f6', '#f59e0b', '#ef4444'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/95 border border-gray-800 rounded-lg p-3 backdrop-blur-xl">
          <p className="text-sm text-gray-400 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-bold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <BarChart3 className="w-5 h-5 text-CodeSensor-Primary" />
            Score Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="name" 
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="overall" fill="#00FE74" name="Overall" />
              <Bar dataKey="quality" fill="#3b82f6" name="Quality" />
              <Bar dataKey="security" fill="#f59e0b" name="Security" />
              <Bar dataKey="structure" fill="#ef4444" name="Structure" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Radar Chart */}
      <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <BarChart3 className="w-5 h-5 text-CodeSensor-Primary" />
            Multi-dimensional View
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis 
                dataKey="metric" 
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]}
                stroke="#9ca3af"
                style={{ fontSize: '10px' }}
              />
              {repositories.map((repo, index) => (
                <Radar
                  key={repo.id}
                  name={repo.name.length > 20 ? repo.name.substring(0, 20) + '...' : repo.name}
                  dataKey={`repo${index}`}
                  stroke={colors[index]}
                  fill={colors[index]}
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              ))}
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
