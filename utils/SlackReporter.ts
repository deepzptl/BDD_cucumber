import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import { createSlackNotifier, SlackNotifier } from './SlackNotifier';

class SlackReporter implements Reporter {
  private slackNotifier: SlackNotifier;
  private testResults: { testName: string; status: 'passed' | 'failed' | 'skipped'; duration: number; error?: string }[] = [];

  constructor() {
    this.slackNotifier = createSlackNotifier();
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const status = result.status === 'timedOut' || result.status === 'interrupted' ? 'failed' : result.status;
    this.testResults.push({
      testName: test.title,
      status: status as 'passed' | 'failed' | 'skipped',
      duration: result.duration,
      error: result.error?.message
    });
  }

  async onEnd() {
    const totalTests = this.testResults.length;
    const passedTests = this.testResults.filter(t => t.status === 'passed').length;
    const failedTests = this.testResults.filter(t => t.status === 'failed').length;
    const skippedTests = this.testResults.filter(t => t.status === 'skipped').length;
    const totalDuration = this.testResults.reduce((acc, t) => acc + t.duration, 0);

    await this.slackNotifier.sendTestSummary({
      total: totalTests,
      passed: passedTests,
      failed: failedTests,
      skipped: skippedTests,
      duration: totalDuration,
      results: this.testResults
    });
  }
}

export default SlackReporter;
