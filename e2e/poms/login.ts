// LoginPage.ts
import { Page } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) {}

    async enterEmail(email: string) {
        await this.page.locator('[data-test-id="neeto-auth-email-input-field"]').fill(email);
        await this.page.locator('[data-test-id="neeto-auth-login-button"]').click();
    }

    async enterOTP(otp: string) {
        await this.page.getByPlaceholder('Enter 6 digit login code').fill(otp);
    }
}
