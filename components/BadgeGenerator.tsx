'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check, Code } from 'lucide-react';
import { motion } from 'framer-motion';

interface BadgeGeneratorProps {
  repositoryId: string;
  repositoryName: string;
}

export function BadgeGenerator({ repositoryId, repositoryName }: BadgeGeneratorProps) {
  const [copied, setCopied] = useState<'markdown' | 'html' | null>(null);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const badgeUrl = `${baseUrl}/api/repositories/${repositoryId}/badge`;
  const repoUrl = `${baseUrl}/dashboard/repos/${repositoryId}`;

  const markdownCode = `[![CodeSensor](${badgeUrl})](${repoUrl})`;
  const htmlCode = `<a href="${repoUrl}"><img src="${badgeUrl}" alt="CodeSensor Analysis" /></a>`;

  const copyToClipboard = (text: string, type: 'markdown' | 'html') => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border-gray-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <Code className="w-5 h-5 text-CodeSensor-Primary" />
            README Badge
          </CardTitle>
          <p className="text-sm text-gray-400">
            Add this badge to your repository's README
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Preview */}
          <div className="p-4 bg-black/50 rounded-lg border border-gray-800">
            <p className="text-xs text-gray-500 mb-2">Preview:</p>
            <img 
              src={badgeUrl} 
              alt="CodeSensor Badge" 
              className="inline-block"
            />
          </div>

          {/* Markdown */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-400">Markdown</label>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(markdownCode, 'markdown')}
                className="h-8 px-2 text-gray-400 hover:text-white hover:bg-gray-800"
              >
                {copied === 'markdown' ? (
                  <>
                    <Check className="w-3 h-3 mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <code className="block p-3 bg-black/50 rounded border border-gray-800 text-xs text-gray-300 overflow-x-auto">
              {markdownCode}
            </code>
          </div>

          {/* HTML */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-400">HTML</label>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(htmlCode, 'html')}
                className="h-8 px-2 text-gray-400 hover:text-white hover:bg-gray-800"
              >
                {copied === 'html' ? (
                  <>
                    <Check className="w-3 h-3 mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <code className="block p-3 bg-black/50 rounded border border-gray-800 text-xs text-gray-300 overflow-x-auto">
              {htmlCode}
            </code>
          </div>

          <p className="text-xs text-gray-500 pt-2">
            💡 The badge updates automatically with each new analysis
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
