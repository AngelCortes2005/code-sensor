'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ComparisonProps {
  current: number;
  previous: number;
  label: string;
  color: string;
}

export function ScoreComparison({ current, previous, label, color }: ComparisonProps) {
  const difference = current - previous;
  const percentage = previous > 0 ? ((difference / previous) * 100).toFixed(1) : '0';
  const isImproving = difference > 0;
  const isStable = Math.abs(difference) < 2;

  const Icon = isStable ? Minus : isImproving ? TrendingUp : TrendingDown;
  const trendColor = isStable ? 'text-gray-400' : isImproving ? 'text-green-400' : 'text-red-400';
  const bgColor = isStable ? 'bg-gray-500/10' : isImproving ? 'bg-green-500/10' : 'bg-red-500/10';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border-gray-800 hover:border-gray-700 transition-all">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-400 flex items-center justify-between">
            {label}
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${bgColor}`}>
              <Icon className={`w-3 h-3 ${trendColor}`} />
              <span className={`text-xs font-semibold ${trendColor}`}>
                {isStable ? '±0' : `${difference > 0 ? '+' : ''}${difference}`}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Current Score */}
            <div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-white">{current}</span>
                <span className="text-sm text-gray-500">/100</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${current}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full bg-gradient-to-r ${color}`}
                />
              </div>
            </div>

            {/* Previous Score */}
            <div className="pt-2 border-t border-gray-800/50">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Previous: {previous}</span>
                {!isStable && (
                  <span className={`font-semibold ${trendColor}`}>
                    {percentage}%
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface ComparisonSummaryProps {
  improvements: {
    quality: number;
    security: number;
    structure: number;
    overall: number;
  };
  trend: 'improving' | 'declining' | 'stable';
}

export function ComparisonSummary({ improvements, trend }: ComparisonSummaryProps) {
  const trendConfig = {
    improving: {
      icon: TrendingUp,
      text: 'Improving',
      color: 'text-green-400',
      bg: 'from-green-500/20 to-emerald-500/20',
      border: 'border-green-500/30',
    },
    declining: {
      icon: TrendingDown,
      text: 'Needs Attention',
      color: 'text-red-400',
      bg: 'from-red-500/20 to-orange-500/20',
      border: 'border-red-500/30',
    },
    stable: {
      icon: Minus,
      text: 'Stable',
      color: 'text-gray-400',
      bg: 'from-gray-500/20 to-gray-600/20',
      border: 'border-gray-500/30',
    },
  };

  const config = trendConfig[trend];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Card className={`backdrop-blur-xl bg-gradient-to-br ${config.bg} border ${config.border}`}>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.bg} flex items-center justify-center`}>
              <Icon className={`w-6 h-6 ${config.color}`} />
            </div>
            
            <div className="flex-1">
              <h3 className={`text-lg font-semibold mb-1 ${config.color}`}>
                Code Quality Trend: {config.text}
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                Comparison with previous analysis
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Overall', value: improvements.overall },
                  { label: 'Quality', value: improvements.quality },
                  { label: 'Security', value: improvements.security },
                  { label: 'Structure', value: improvements.structure },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className={`text-xl font-bold ${
                      item.value > 0 ? 'text-green-400' : 
                      item.value < 0 ? 'text-red-400' : 
                      'text-gray-400'
                    }`}>
                      {item.value > 0 ? '+' : ''}{item.value}
                    </div>
                    <div className="text-xs text-gray-500">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface BeforeAfterProps {
  previousScore: number;
  currentScore: number;
}

export function BeforeAfter({ previousScore, currentScore }: BeforeAfterProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center gap-4 py-6"
    >
      <div className="text-center">
        <div className="text-sm text-gray-500 mb-2">Before</div>
        <div className="text-4xl font-bold text-gray-400">{previousScore}</div>
      </div>

      <ArrowRight className="w-8 h-8 text-CodeSensor-Primary" />

      <div className="text-center">
        <div className="text-sm text-gray-500 mb-2">Now</div>
        <div className="text-4xl font-bold bg-gradient-to-r from-CodeSensor-Secondary to-CodeSensor-Primary bg-clip-text text-transparent">
          {currentScore}
        </div>
      </div>
    </motion.div>
  );
}
