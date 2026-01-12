'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface Analysis {
  id: string;
  created_at: string;
  quality_score: number;
  security_score: number;
  structure_score: number;
  overall_score: number;
}

interface AnalysisChartProps {
  history: Analysis[];
}

export function AnalysisChart({ history }: AnalysisChartProps) {
  // Prepare data for chart (reverse to show oldest first)
  const chartData = [...history]
    .reverse()
    .map((analysis, index) => ({
      name: format(new Date(analysis.created_at), 'MMM dd'),
      date: analysis.created_at,
      Overall: analysis.overall_score,
      Quality: analysis.quality_score,
      Security: analysis.security_score,
      Structure: analysis.structure_score,
      index: index + 1,
    }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="backdrop-blur-xl bg-gray-900/90 border border-gray-800 rounded-lg p-3 shadow-xl">
          <p className="text-sm text-gray-400 mb-2">
            {format(new Date(payload[0].payload.date), 'MMM dd, yyyy')}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (history.length < 2) {
    return (
      <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border-gray-800">
        <CardContent className="p-12 text-center">
          <div className="text-gray-500 mb-2">Not enough data</div>
          <p className="text-sm text-gray-600">
            Run at least 2 analyses to see the evolution chart
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border-gray-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">
            Analysis Evolution
          </CardTitle>
          <p className="text-sm text-gray-400">
            Score trends over time ({history.length} analyses)
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="name" 
                stroke="#9CA3AF"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#9CA3AF"
                style={{ fontSize: '12px' }}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: '12px' }}
                iconType="line"
              />
              <Line 
                type="monotone" 
                dataKey="Overall" 
                stroke="#00FE74" 
                strokeWidth={3}
                dot={{ fill: '#00FE74', r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="Quality" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6', r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="Security" 
                stroke="#EF4444" 
                strokeWidth={2}
                dot={{ fill: '#EF4444', r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="Structure" 
                stroke="#A855F7" 
                strokeWidth={2}
                dot={{ fill: '#A855F7', r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Legend explanation */}
          <div className="mt-4 pt-4 border-t border-gray-800/50 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#00FE74]" />
              <span className="text-gray-400">Overall Score</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#3B82F6]" />
              <span className="text-gray-400">Code Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
              <span className="text-gray-400">Security</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#A855F7]" />
              <span className="text-gray-400">Structure</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
