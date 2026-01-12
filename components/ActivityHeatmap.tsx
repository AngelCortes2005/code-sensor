'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

interface ActivityDay {
  date: string;
  count: number;
  level: number; // 0-4
}

interface ActivityHeatmapProps {
  data: ActivityDay[];
}

export function ActivityHeatmap({ data }: ActivityHeatmapProps) {
  // Group by weeks
  const weeks: ActivityDay[][] = [];
  let currentWeek: ActivityDay[] = [];
  
  data.forEach((day, index) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || index === data.length - 1) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-gray-800/50';
      case 1: return 'bg-CodeSensor-Primary/20';
      case 2: return 'bg-CodeSensor-Primary/40';
      case 3: return 'bg-CodeSensor-Primary/60';
      case 4: return 'bg-CodeSensor-Primary';
      default: return 'bg-gray-800/50';
    }
  };

  const getLevelLabel = (level: number) => {
    switch (level) {
      case 0: return 'No activity';
      case 1: return '1-2 analyses';
      case 2: return '3-4 analyses';
      case 3: return '5-6 analyses';
      case 4: return '7+ analyses';
      default: return 'No activity';
    }
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Calendar className="w-5 h-5 text-CodeSensor-Primary" />
          Activity Heatmap
        </CardTitle>
        <p className="text-sm text-gray-400 mt-1">Your analysis activity over time</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Heatmap Grid */}
          <div className="overflow-x-auto">
            <div className="inline-flex flex-col gap-1">
              {/* Day labels */}
              <div className="flex gap-1">
                <div className="w-8"></div>
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="w-3"></div>
                ))}
              </div>
              
              {/* Grid */}
              {weekDays.map((day, dayIndex) => (
                <div key={dayIndex} className="flex gap-1 items-center">
                  <div className="w-8 text-xs text-gray-500 text-right pr-2">
                    {dayIndex % 2 === 0 ? day : ''}
                  </div>
                  {weeks.map((week, weekIndex) => {
                    const dayData = week[dayIndex];
                    return (
                      <div key={weekIndex} className="group relative">
                        <div
                          className={`w-3 h-3 rounded-sm ${
                            dayData ? getLevelColor(dayData.level) : 'bg-gray-800/30'
                          } hover:ring-2 hover:ring-CodeSensor-Primary transition-all cursor-pointer`}
                        />
                        {dayData && (
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                            <div className="bg-gray-900 border border-gray-700 rounded-lg p-2 text-xs whitespace-nowrap shadow-lg">
                              <p className="text-white font-semibold">{dayData.count} analyses</p>
                              <p className="text-gray-400">{dayData.date}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 text-xs text-gray-400 pt-2 border-t border-gray-800">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm ${getLevelColor(level)}`}
                title={getLevelLabel(level)}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
