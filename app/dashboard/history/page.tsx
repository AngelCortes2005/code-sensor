'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Clock, GitCommit, TrendingUp, Calendar, Github } from 'lucide-react';

export default function HistoryPage() {
  // Mock data - replace with real data from your API
  const recentActivity = [
    {
      id: 1,
      type: 'analysis',
      repository: 'my-awesome-project',
      action: 'Code analysis completed',
      timestamp: '2 hours ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'commit',
      repository: 'frontend-app',
      action: 'New commits detected',
      timestamp: '5 hours ago',
      status: 'info'
    },
    {
      id: 3,
      type: 'analysis',
      repository: 'backend-api',
      action: 'Security scan completed',
      timestamp: '1 day ago',
      status: 'warning'
    },
    {
      id: 4,
      type: 'sync',
      repository: 'all-repositories',
      action: 'Repository sync completed',
      timestamp: '2 days ago',
      status: 'success'
    },
  ];

  const stats = [
    {
      title: 'Total Analyses',
      value: '24',
      icon: <Activity className="w-5 h-5" />,
      trend: '+12%',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'This Week',
      value: '8',
      icon: <Calendar className="w-5 h-5" />,
      trend: '+25%',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Avg. Time',
      value: '2.5m',
      icon: <Clock className="w-5 h-5" />,
      trend: '-10%',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Repositories',
      value: '12',
      icon: <Github className="w-5 h-5" />,
      trend: '+2',
      gradient: 'from-orange-500 to-red-500'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'warning':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'info':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      default:
        return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

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
        {stats.map((stat, index) => (
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
                    <p className="text-sm text-gray-400">
                      Repository: <span className="text-CodeSensor-Primary">{activity.repository}</span>
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)} border`}>
                    {activity.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Empty State Message */}
        <div className="text-center py-8">
          <p className="text-sm text-gray-500">
            Showing recent activity. More features coming soon!
          </p>
        </div>
      </div>
    </div>
  );
}