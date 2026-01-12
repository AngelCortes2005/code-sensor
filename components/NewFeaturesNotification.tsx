'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, TrendingUp, Download, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NewFeaturesNotification() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has seen this notification
    const hasSeenFeatures = localStorage.getItem('hasSeenNewFeatures_v1');
    if (!hasSeenFeatures) {
      // Show after 2 seconds
      setTimeout(() => setIsVisible(true), 2000);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenNewFeatures_v1', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 right-6 z-50 max-w-md"
        >
          <div className="backdrop-blur-xl bg-gradient-to-br from-gray-900/95 to-black/95 border border-CodeSensor-Primary/30 rounded-2xl shadow-2xl p-6">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-CodeSensor-Secondary to-CodeSensor-Primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">New Features!</h3>
                <p className="text-xs text-gray-400">Check out what's new</p>
              </div>
            </div>

            {/* Features list */}
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Analysis Comparison</p>
                  <p className="text-xs text-gray-400">Track your code quality evolution over time</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Download className="w-3 h-3 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Export Reports</p>
                  <p className="text-xs text-gray-400">Download as PDF or Markdown</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Code className="w-3 h-3 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">README Badges</p>
                  <p className="text-xs text-gray-400">Show your code quality in your repo</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Button
              onClick={handleClose}
              className="w-full bg-gradient-to-r from-CodeSensor-Secondary to-CodeSensor-Primary hover:opacity-90 text-black font-semibold"
            >
              Got it!
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
