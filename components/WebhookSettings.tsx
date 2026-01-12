'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Webhook, Copy, Check, AlertCircle, GitBranch, GitPullRequest, Info } from 'lucide-react';

interface WebhookSettingsProps {
  repositoryId: string;
  repositoryName: string;
}

export function WebhookSettings({ repositoryId, repositoryName }: WebhookSettingsProps) {
  const [enabled, setEnabled] = useState(false);
  const [events, setEvents] = useState<string[]>(['push', 'pull_request']);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchWebhookConfig();
  }, [repositoryId]);

  const fetchWebhookConfig = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/repositories/${repositoryId}/webhook`);
      if (response.ok) {
        const data = await response.json();
        setEnabled(data.webhookEnabled);
        setEvents(data.webhookEvents || ['push', 'pull_request']);
        setWebhookUrl(data.webhookUrl);
      }
    } catch (error) {
      console.error('Failed to fetch webhook config:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async () => {
    try {
      setSaving(true);
      const response = await fetch(`/api/repositories/${repositoryId}/webhook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enabled: !enabled,
          events,
        }),
      });

      if (response.ok) {
        setEnabled(!enabled);
      }
    } catch (error) {
      console.error('Failed to update webhook:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEventToggle = async (event: string) => {
    const newEvents = events.includes(event)
      ? events.filter(e => e !== event)
      : [...events, event];

    try {
      setSaving(true);
      const response = await fetch(`/api/repositories/${repositoryId}/webhook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enabled,
          events: newEvents,
        }),
      });

      if (response.ok) {
        setEvents(newEvents);
      }
    } catch (error) {
      console.error('Failed to update events:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800">
        <CardContent className="p-12">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-800 rounded w-1/2"></div>
            <div className="h-12 bg-gray-800 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Webhook className="w-5 h-5 text-CodeSensor-Primary" />
          Automatic Analysis
        </CardTitle>
        <p className="text-sm text-gray-400 mt-1">
          Trigger analysis automatically on GitHub events
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Enable/Disable Toggle */}
        <div className="flex items-center justify-between p-4 rounded-lg border border-gray-800 bg-gray-900/50">
          <div className="flex-1">
            <h4 className="font-semibold text-white">Enable Webhooks</h4>
            <p className="text-sm text-gray-400">
              Automatically analyze code on push and pull requests
            </p>
          </div>
          <Button
            onClick={handleToggle}
            disabled={saving}
            className={`${
              enabled
                ? 'bg-CodeSensor-Primary hover:bg-CodeSensor-Primary/80'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            {enabled ? 'Enabled' : 'Disabled'}
          </Button>
        </div>

        {/* Webhook URL */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Webhook URL</label>
          <div className="flex gap-2">
            <div className="flex-1 p-3 rounded-lg bg-gray-900/50 border border-gray-800 font-mono text-sm text-gray-300 overflow-x-auto">
              {webhookUrl}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyUrl}
              className="border-gray-800 hover:border-CodeSensor-Primary/50 bg-transparent shrink-0"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Event Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-300">Trigger Events</label>
          
          <div className="space-y-2">
            <div
              onClick={() => handleEventToggle('push')}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                events.includes('push')
                  ? 'border-CodeSensor-Primary bg-CodeSensor-Primary/10'
                  : 'border-gray-800 bg-gray-900/50 hover:border-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <GitBranch className="w-5 h-5 text-CodeSensor-Primary" />
                <div className="flex-1">
                  <h4 className="font-semibold text-white">Push Events</h4>
                  <p className="text-sm text-gray-400">
                    Analyze when code is pushed to main/master
                  </p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 ${
                  events.includes('push')
                    ? 'border-CodeSensor-Primary bg-CodeSensor-Primary'
                    : 'border-gray-700'
                }`}>
                  {events.includes('push') && (
                    <Check className="w-4 h-4 text-black" strokeWidth={3} />
                  )}
                </div>
              </div>
            </div>

            <div
              onClick={() => handleEventToggle('pull_request')}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                events.includes('pull_request')
                  ? 'border-CodeSensor-Primary bg-CodeSensor-Primary/10'
                  : 'border-gray-800 bg-gray-900/50 hover:border-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <GitPullRequest className="w-5 h-5 text-CodeSensor-Primary" />
                <div className="flex-1">
                  <h4 className="font-semibold text-white">Pull Request Events</h4>
                  <p className="text-sm text-gray-400">
                    Analyze when PRs are opened or updated
                  </p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 ${
                  events.includes('pull_request')
                    ? 'border-CodeSensor-Primary bg-CodeSensor-Primary'
                    : 'border-gray-700'
                }`}>
                  {events.includes('pull_request') && (
                    <Check className="w-4 h-4 text-black" strokeWidth={3} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="p-4 rounded-lg border border-blue-500/30 bg-blue-500/10">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="space-y-2 text-sm">
              <p className="font-semibold text-blue-400">GitHub Setup Required</p>
              <ol className="list-decimal list-inside space-y-1 text-gray-300">
                <li>Go to your repository settings on GitHub</li>
                <li>Navigate to Webhooks → Add webhook</li>
                <li>Paste the webhook URL above</li>
                <li>Set Content type to <code className="px-1 py-0.5 bg-gray-900 rounded text-xs">application/json</code></li>
                <li>Select the events you want to trigger</li>
                <li>Save the webhook</li>
              </ol>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
