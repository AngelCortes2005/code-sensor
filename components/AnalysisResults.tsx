'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  TrendingUp,
  Code,
  Lock,
  Lightbulb,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useState } from 'react';

interface AnalysisResult {
  id: number;
  quality_score: number;
  security_score: number;
  structure_score: number;
  overall_score: number;
  analysis_data: {
    quality: {
      score: number;
      summary: string;
      issues: string[];
      strengths: string[];
    };
    security: {
      score: number;
      vulnerabilities: Array<{
        severity: 'critical' | 'high' | 'medium' | 'low';
        description: string;
        recommendation: string;
      }>;
    };
    structure: {
      score: number;
      organization: string;
      improvements: string[];
    };
    recommendations: Array<{
      category: string;
      priority: 'high' | 'medium' | 'low';
      description: string;
      implementation: string;
    }>;
    overall_score: number;
    summary: string;
  };
  created_at: string;
}

interface AnalysisResultsProps {
  analysis: AnalysisResult;
}

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    security: true,
    quality: true,
    structure: false,
    recommendations: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-500';
    if (score >= 60) return 'from-yellow-500 to-orange-500';
    if (score >= 40) return 'from-orange-500 to-red-500';
    return 'from-red-500 to-rose-500';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  const data = analysis.analysis_data;

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Overall Score</h3>
              <p className="text-sm text-gray-400">{data.summary}</p>
            </div>
            <div className="text-center">
              <div className={`text-5xl font-bold ${getScoreColor(analysis.overall_score)}`}>
                {analysis.overall_score}
              </div>
              <p className="text-sm text-gray-400 mt-1">of 100</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-400" />
                <span className="font-semibold text-white">Quality</span>
              </div>
              <span className={`text-2xl font-bold ${getScoreColor(analysis.quality_score)}`}>
                {analysis.quality_score}
              </span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className={`h-2 rounded-full bg-gradient-to-r ${getScoreBg(analysis.quality_score)}`}
                style={{ width: `${analysis.quality_score}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="font-semibold text-white">Security</span>
              </div>
              <span className={`text-2xl font-bold ${getScoreColor(analysis.security_score)}`}>
                {analysis.security_score}
              </span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className={`h-2 rounded-full bg-gradient-to-r ${getScoreBg(analysis.security_score)}`}
                style={{ width: `${analysis.security_score}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                <span className="font-semibold text-white">Structure</span>
              </div>
              <span className={`text-2xl font-bold ${getScoreColor(analysis.structure_score)}`}>
                {analysis.structure_score}
              </span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className={`h-2 rounded-full bg-gradient-to-r ${getScoreBg(analysis.structure_score)}`}
                style={{ width: `${analysis.structure_score}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Vulnerabilities */}
      <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800">
        <CardHeader 
          className="cursor-pointer"
          onClick={() => toggleSection('security')}
        >
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-red-400" />
              <CardTitle>Security Analysis</CardTitle>
              <Badge className="bg-red-500/10 text-red-400 border-red-500/30">
                {data.security.vulnerabilities.length} Found
              </Badge>
            </div>
            {expandedSections.security ? <ChevronUp /> : <ChevronDown />}
          </div>
        </CardHeader>
        {expandedSections.security && (
          <CardContent className="space-y-4">
            {data.security.vulnerabilities.length === 0 ? (
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle2 className="w-5 h-5" />
                <span>No critical vulnerabilities found</span>
              </div>
            ) : (
              data.security.vulnerabilities.map((vuln, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-lg bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800/50"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {vuln.severity === 'critical' || vuln.severity === 'high' ? (
                        <XCircle className="w-5 h-5 text-red-400" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getSeverityColor(vuln.severity)}>
                          {vuln.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-white font-medium mb-2">{vuln.description}</p>
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                        <p className="text-sm text-blue-300">
                          <strong>Recommendation:</strong> {vuln.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        )}
      </Card>

      {/* Quality Analysis */}
      <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800 text-white">
        <CardHeader 
          className="cursor-pointer"
          onClick={() => toggleSection('quality')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-blue-400" />
              <CardTitle>Quality Analysis</CardTitle>
            </div>
            {expandedSections.quality ? <ChevronUp /> : <ChevronDown />}
          </div>
        </CardHeader>
        {expandedSections.quality && (
          <CardContent className="space-y-4">
            <p className="text-gray-300">{data.quality.summary}</p>
            
            {data.quality.strengths.length > 0 && (
              <div>
                <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Strengths
                </h4>
                <ul className="space-y-2">
                  {data.quality.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300">
                      <span className="text-green-400">•</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {data.quality.issues.length > 0 && (
              <div>
                <h4 className="font-semibold text-orange-400 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Issues Found
                </h4>
                <ul className="space-y-2">
                  {data.quality.issues.map((issue, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300">
                      <span className="text-orange-400">•</span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        )}
      </Card>

      {/* Structure Analysis */}
      <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800 text-white">
        <CardHeader 
          className="cursor-pointer"
          onClick={() => toggleSection('structure')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <CardTitle>Structure Analysis</CardTitle>
            </div>
            {expandedSections.structure ? <ChevronUp /> : <ChevronDown />}
          </div>
        </CardHeader>
        {expandedSections.structure && (
          <CardContent className="space-y-4">
            <p className="text-gray-300">{data.structure.organization}</p>
            
            {data.structure.improvements.length > 0 && (
              <div>
                <h4 className="font-semibold text-purple-400 mb-2">Suggested Improvements</h4>
                <ul className="space-y-2">
                  {data.structure.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300">
                      <span className="text-purple-400">•</span>
                      <span>{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        )}
      </Card>

      {/* Recommendations */}
      <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800 text-white">
        <CardHeader 
          className="cursor-pointer"
          onClick={() => toggleSection('recommendations')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              <CardTitle>Recommendations</CardTitle>
              <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30">
                {data.recommendations.length}
              </Badge>
            </div>
            {expandedSections.recommendations ? <ChevronUp /> : <ChevronDown />}
          </div>
        </CardHeader>
        {expandedSections.recommendations && (
          <CardContent className="space-y-4">
            {data.recommendations.map((rec, index) => (
              <div 
                key={index}
                className="p-4 rounded-lg bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800/50"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                      {rec.category}
                    </Badge>
                    <Badge className={getPriorityColor(rec.priority)}>
                      {rec.priority}
                    </Badge>
                  </div>
                </div>
                <p className="text-white font-medium mb-2">{rec.description}</p>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <p className="text-sm text-green-300">
                    <strong>Implementation:</strong> {rec.implementation}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        )}
      </Card>
    </div>
  );
}
