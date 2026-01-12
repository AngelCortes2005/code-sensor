'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, ExternalLink, Code, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface Recommendation {
  category: string;
  priority: 'high' | 'medium' | 'low';
  description: string;
  implementation: string;
  resources?: Array<{
    title: string;
    url: string;
  }>;
  example?: string;
}

interface DetailedRecommendationsProps {
  recommendations: Recommendation[];
}

export function DetailedRecommendations({ recommendations }: DetailedRecommendationsProps) {
  const [expandedIndices, setExpandedIndices] = useState<number[]>([]);

  const toggleExpanded = (index: number) => {
    setExpandedIndices(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return {
          bg: 'bg-red-500/10',
          border: 'border-red-500/30',
          text: 'text-red-400',
          badge: 'bg-red-500/20 text-red-400'
        };
      case 'medium':
        return {
          bg: 'bg-yellow-500/10',
          border: 'border-yellow-500/30',
          text: 'text-yellow-400',
          badge: 'bg-yellow-500/20 text-yellow-400'
        };
      case 'low':
        return {
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/30',
          text: 'text-blue-400',
          badge: 'bg-blue-500/20 text-blue-400'
        };
      default:
        return {
          bg: 'bg-gray-500/10',
          border: 'border-gray-500/30',
          text: 'text-gray-400',
          badge: 'bg-gray-500/20 text-gray-400'
        };
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4" />;
      case 'medium':
        return <Lightbulb className="w-4 h-4" />;
      case 'low':
        return <Code className="w-4 h-4" />;
      default:
        return <Lightbulb className="w-4 h-4" />;
    }
  };

  // Group by priority
  const groupedRecommendations = {
    high: recommendations.filter(r => r.priority === 'high'),
    medium: recommendations.filter(r => r.priority === 'medium'),
    low: recommendations.filter(r => r.priority === 'low'),
  };

  return (
    <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          Detailed Recommendations
        </CardTitle>
        <p className="text-sm text-gray-400 mt-1">
          {recommendations.length} actionable suggestions to improve your code
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* High Priority */}
        {groupedRecommendations.high.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              High Priority ({groupedRecommendations.high.length})
            </h3>
            {groupedRecommendations.high.map((rec, index) => {
              const globalIndex = recommendations.indexOf(rec);
              const isExpanded = expandedIndices.includes(globalIndex);
              const colors = getPriorityColor(rec.priority);

              return (
                <div
                  key={globalIndex}
                  className={`p-4 rounded-lg border ${colors.border} ${colors.bg}`}
                >
                  {/* Header */}
                  <div
                    className="flex items-start justify-between cursor-pointer"
                    onClick={() => toggleExpanded(globalIndex)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getPriorityIcon(rec.priority)}
                        <h4 className="font-semibold text-white">{rec.category}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors.badge}`}>
                          {rec.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300">{rec.description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="shrink-0 hover:bg-gray-800"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </Button>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="mt-4 space-y-4 pt-4 border-t border-gray-800">
                      {/* Implementation */}
                      <div>
                        <h5 className="text-sm font-semibold text-gray-300 mb-2">
                          Implementation Steps
                        </h5>
                        <p className="text-sm text-gray-400">{rec.implementation}</p>
                      </div>

                      {/* Code Example */}
                      {rec.example && (
                        <div>
                          <h5 className="text-sm font-semibold text-gray-300 mb-2">
                            Example
                          </h5>
                          <div className="relative">
                            <pre className="p-3 bg-black/50 rounded border border-gray-800 overflow-x-auto">
                              <code className="text-xs text-gray-300">{rec.example}</code>
                            </pre>
                          </div>
                        </div>
                      )}

                      {/* Resources */}
                      {rec.resources && rec.resources.length > 0 && (
                        <div>
                          <h5 className="text-sm font-semibold text-gray-300 mb-2">
                            Learn More
                          </h5>
                          <div className="space-y-2">
                            {rec.resources.map((resource, rIndex) => (
                              <a
                                key={rIndex}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-CodeSensor-Primary hover:text-CodeSensor-Primary/80 transition-colors"
                              >
                                <ExternalLink className="w-3 h-3" />
                                {resource.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Medium Priority */}
        {groupedRecommendations.medium.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-yellow-400 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Medium Priority ({groupedRecommendations.medium.length})
            </h3>
            {groupedRecommendations.medium.map((rec, index) => {
              const globalIndex = recommendations.indexOf(rec);
              const isExpanded = expandedIndices.includes(globalIndex);
              const colors = getPriorityColor(rec.priority);

              return (
                <div
                  key={globalIndex}
                  className={`p-4 rounded-lg border ${colors.border} ${colors.bg}`}
                >
                  <div
                    className="flex items-start justify-between cursor-pointer"
                    onClick={() => toggleExpanded(globalIndex)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getPriorityIcon(rec.priority)}
                        <h4 className="font-semibold text-white">{rec.category}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors.badge}`}>
                          {rec.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300">{rec.description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="shrink-0 hover:bg-gray-800"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </Button>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 space-y-4 pt-4 border-t border-gray-800">
                      <div>
                        <h5 className="text-sm font-semibold text-gray-300 mb-2">
                          Implementation Steps
                        </h5>
                        <p className="text-sm text-gray-400">{rec.implementation}</p>
                      </div>

                      {rec.example && (
                        <div>
                          <h5 className="text-sm font-semibold text-gray-300 mb-2">
                            Example
                          </h5>
                          <pre className="p-3 bg-black/50 rounded border border-gray-800 overflow-x-auto">
                            <code className="text-xs text-gray-300">{rec.example}</code>
                          </pre>
                        </div>
                      )}

                      {rec.resources && rec.resources.length > 0 && (
                        <div>
                          <h5 className="text-sm font-semibold text-gray-300 mb-2">
                            Learn More
                          </h5>
                          <div className="space-y-2">
                            {rec.resources.map((resource, rIndex) => (
                              <a
                                key={rIndex}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-CodeSensor-Primary hover:text-CodeSensor-Primary/80 transition-colors"
                              >
                                <ExternalLink className="w-3 h-3" />
                                {resource.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Low Priority */}
        {groupedRecommendations.low.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-blue-400 flex items-center gap-2">
              <Code className="w-4 h-4" />
              Low Priority ({groupedRecommendations.low.length})
            </h3>
            {groupedRecommendations.low.map((rec, index) => {
              const globalIndex = recommendations.indexOf(rec);
              const isExpanded = expandedIndices.includes(globalIndex);
              const colors = getPriorityColor(rec.priority);

              return (
                <div
                  key={globalIndex}
                  className={`p-4 rounded-lg border ${colors.border} ${colors.bg}`}
                >
                  <div
                    className="flex items-start justify-between cursor-pointer"
                    onClick={() => toggleExpanded(globalIndex)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getPriorityIcon(rec.priority)}
                        <h4 className="font-semibold text-white">{rec.category}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors.badge}`}>
                          {rec.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300">{rec.description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="shrink-0 hover:bg-gray-800"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </Button>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 space-y-4 pt-4 border-t border-gray-800">
                      <div>
                        <h5 className="text-sm font-semibold text-gray-300 mb-2">
                          Implementation Steps
                        </h5>
                        <p className="text-sm text-gray-400">{rec.implementation}</p>
                      </div>

                      {rec.example && (
                        <div>
                          <h5 className="text-sm font-semibold text-gray-300 mb-2">
                            Example
                          </h5>
                          <pre className="p-3 bg-black/50 rounded border border-gray-800 overflow-x-auto">
                            <code className="text-xs text-gray-300">{rec.example}</code>
                          </pre>
                        </div>
                      )}

                      {rec.resources && rec.resources.length > 0 && (
                        <div>
                          <h5 className="text-sm font-semibold text-gray-300 mb-2">
                            Learn More
                          </h5>
                          <div className="space-y-2">
                            {rec.resources.map((resource, rIndex) => (
                              <a
                                key={rIndex}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-CodeSensor-Primary hover:text-CodeSensor-Primary/80 transition-colors"
                              >
                                <ExternalLink className="w-3 h-3" />
                                {resource.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
