import { Page, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class LoginPage extends BasePage {
  async login(email: string, pass: string) {
    this.logStep('Opening the application');
    await this.page.goto('/');
    this.logStep('Opening the login page');
    await this.page.getByRole('link', { name: 'Sign in or join using your' }).click();
    await expect(this.page).toHaveURL(/.*login/);
    this.logStep('Entering login credentials');
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(pass);
    await this.page.getByRole('checkbox', { name: 'Remember me' }).check();
    this.logStep('Submitting login');
    await this.page.getByRole('button', { name: 'Sign In' }).click();

    // Wait for redirect away from the login page
    await this.page.waitForURL(url => !url.pathname.includes('login'), { timeout: 30000 });
    await this.page.waitForLoadState('networkidle');
    this.logStep('Login completed');
  }
}
