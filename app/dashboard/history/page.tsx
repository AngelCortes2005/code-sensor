'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Clock, GitCommit, TrendingUp, Calendar, Github, AlertCircle } from 'lucide-react';
import { useAnalyses } from '@/hooks/useAnalyses';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export default function HistoryPage() {
  const { analyses, stats, loading, error } = useAnalyses();

  // Transform analyses to activities
  const recentActivity = analyses.map(analysis => {
    const repo = analysis.repository;
    const score = analysis.overall_score;
    
    let status = 'success';
    if (score < 50) status = 'warning';
    if (score < 30) status = 'error';
    
    return {
      id: analysis.id,
      type: 'analysis',
      repository: repo?.name || 'Unknown',
      action: 'Code analysis completed',
      timestamp: formatDistanceToNow(new Date(analysis.created_at), { 
        addSuffix: true,
        locale: es 
      }),
      status,
      score: analysis.overall_score,
    };
  });

  const statsData = [
    {
      title: 'Total Analyses',
      value: stats?.total.toString() || '0',
      icon: <Activity className="w-5 h-5" />,
      trend: stats?.thisWeek ? `+${stats.thisWeek} this week` : 'No data',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'This Week',
      value: stats?.thisWeek.toString() || '0',
      icon: <Calendar className="w-5 h-5" />,
      trend: stats?.thisWeek && stats.total ? `${Math.round((stats.thisWeek / stats.total) * 100)}%` : '0%',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Avg. Time',
      value: `${stats?.avgDuration || 0}m`,
      icon: <Clock className="w-5 h-5" />,
      trend: 'Per analysis',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Repositories',
      value: stats?.repositories.toString() || '0',
      icon: <Github className="w-5 h-5" />,
      trend: 'Analyzed',
      gradient: 'from-orange-500 to-red-500'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'warning':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'error':
        return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'info':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      default:
        return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <div className="p-6 md:p-8 lg:p-10 flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-CodeSensor-Primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-400">Loading history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 md:p-8 lg:p-10">
        <Card className="backdrop-blur-xl bg-gradient-to-br from-red-900/20 to-black/80 border-red-800">
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Error loading history</h3>
            <p className="text-gray-400">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'analysis':
        return <Activity className="w-5 h-5" />;
      case 'commit':
        return <GitCommit className="w-5 h-5" />;
      case 'sync':
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-6 md:p-8 lg:p-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
          Activity History
        </h1>
        <p className="text-gray-400">
          Track your repository analyses and activities
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statsData.map((stat, index) => (
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
              <div className="flex items-end justify-between">
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-green-400 font-medium">{stat.trend}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activity Timeline */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Recent Activity</h2>
        
        {recentActivity.length === 0 ? (
          <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border-gray-800">
            <CardContent className="p-12 text-center">
              <Activity className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-400 mb-2">
                No recent activity
              </h3>
              <p className="text-gray-500 mb-6">
                Run a code analysis to see your history here
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border-gray-800">
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={activity.id}
                    className={`flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800/50 hover:border-gray-700 transition-all ${
                      index !== recentActivity.length - 1 ? 'mb-3' : ''
                    }`}
                  >
                    {/* Icon */}
                    <div className={`p-3 rounded-lg ${getStatusColor(activity.status)} border`}>
                      {getActivityIcon(activity.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-white">{activity.action}</h3>
                        <span className="text-sm text-gray-500 whitespace-nowrap">
                          {activity.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">
                        Repository: <span className="text-CodeSensor-Primary">{activity.repository}</span>
                      </p>
                      {activity.score !== undefined && (
                        <div className="flex items-center gap-2">
                          <div className="w-full max-w-xs bg-gray-800 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-gradient-to-r from-CodeSensor-Primary to-blue-400 transition-all"
                              style={{ width: `${activity.score}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-gray-400 whitespace-nowrap">
                            {activity.score}/100
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Status Badge */}
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)} border capitalize`}>
                      {activity.status}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}