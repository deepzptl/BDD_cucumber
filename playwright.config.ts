import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import * as dotenv from 'dotenv';
dotenv.config();

const testDir = defineBddConfig({
  features: 'features/**/*.feature',
  steps: 'steps/**/*.ts',
  outputDir: '.features-gen',
});

export default defineConfig({
  testDir,
  timeout: 600000,
  retries: 1,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report' }],
    ['junit', { outputFile: 'junit-report.xml' }],
    ['./utils/SlackReporter.ts'],
  ],

  use: {
    baseURL: process.env.BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  grep: process.env.GREP_PATTERN ? new RegExp(process.env.GREP_PATTERN) : undefined,

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      testDir: './tests',
    },
    {
      name: 'chromium',
      testDir,
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/login-state.json',
      },
      dependencies: ['setup'],
    },
  ],
});
