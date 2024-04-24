// login.spec.ts

import { test, expect } from "@playwright/test"
import { faker } from "@faker-js/faker"

test.describe("Login page", () => {
    test("should login with the correct credentials", async ({ page }) => {
      test.setTimeout(120000);

      const newOTP = faker.string.numeric({ length: 6 });
      await page.goto("https://app.neetoauth.net/login?redirect_uri=neetoplanner.net");

      await test.step("step #1: should be able to enter the email address", async () => {
        await page.locator('[data-test-id="neeto-auth-email-input-field"]').fill("cpts9gnqty9-planner-preethi_namratha-iiit_bhubaneshwar@bigbinary.com");
        await page.locator('[data-test-id="neeto-auth-login-button"]').click();

        await expect(page.getByRole('heading', { name: 'Verify your email' })).toBeVisible();
      });

      await test.step("step #2: should be able to input the login otp", async () => {
        await page.getByPlaceholder('Enter 6 digit login code').fill(newOTP);

        await expect(page.locator('[data-test-id="main-header"]')).toBeVisible({ timeout: 30000 });

      });

      await test.step("step #3: should check if the user has logged in", async () => {
        await page.getByTestId('floating-action-menu-container').getByRole('button').click();
        
        await expect(page.getByRole('heading', { name: 'Preethi Neelap' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();
      });
            
    });
});