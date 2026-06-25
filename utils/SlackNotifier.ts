import { IncomingWebhook } from '@slack/webhook';

interface TestResult {
  testName: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  error?: string;
}

interface TestSummary {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  duration: number;
  results: TestResult[];
}

export class SlackNotifier {
  private webhook: IncomingWebhook | null;
  private enabled: boolean;

  constructor(webhookUrl: string, enabled: boolean = true) {
    this.webhook = webhookUrl ? new IncomingWebhook(webhookUrl) : null;
    this.enabled = enabled && !!webhookUrl;
  }

  async sendTestSummary(summary: TestSummary): Promise<void> {
    if (!this.enabled || !this.webhook) {
      console.log('Slack notifications disabled or webhook URL not configured');
      return;
    }

    const statusEmoji = summary.failed > 0 ? ':x:' : ':white_check_mark:';
    const statusColor = summary.failed > 0 ? 'danger' : 'good';

    const blocks: any[] = [
      {
        type: 'header',
        text: { type: 'plain_text', text: `${statusEmoji} Playwright BDD Test Results`, emoji: true }
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Total Tests:*\n${summary.total}` },
          { type: 'mrkdwn', text: `*Passed:*\n${summary.passed}` },
          { type: 'mrkdwn', text: `*Failed:*\n${summary.failed}` },
          { type: 'mrkdwn', text: `*Skipped:*\n${summary.skipped}` }
        ]
      },
      {
        type: 'section',
        text: { type: 'mrkdwn', text: `*Duration:* ${this.formatDuration(summary.duration)}` }
      }
    ];

    if (summary.failed > 0) {
      const failedTests = summary.results
        .filter(r => r.status === 'failed')
        .slice(0, 5)
        .map(r => `• ${r.testName}${r.error ? `\n  \`${r.error.substring(0, 100)}\`` : ''}`)
        .join('\n');

      blocks.push({
        type: 'section',
        text: { type: 'mrkdwn', text: `*Failed Tests:*\n${failedTests}` }
      });
    }

    blocks.push({
      type: 'context',
      elements: [{ type: 'mrkdwn', text: `_${new Date().toISOString()}_` }]
    });

    try {
      await this.webhook.send({
        text: `${statusEmoji} Playwright BDD Test Results`,
        blocks,
        attachments: [{ color: statusColor, fallback: `Tests: ${summary.passed}/${summary.total} passed, ${summary.failed} failed` }]
      });
      console.log('Slack notification sent successfully');
    } catch (error) {
      console.error('Failed to send Slack notification:', error);
    }
  }

  private formatDuration(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${seconds}s`;
  }
}

export function createSlackNotifier(): SlackNotifier {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL || '';
  const enabled = process.env.SLACK_NOTIFICATIONS !== 'false';
  return new SlackNotifier(webhookUrl, enabled);
}
