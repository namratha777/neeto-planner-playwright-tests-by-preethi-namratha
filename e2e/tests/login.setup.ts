import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker"
import { LoginPage } from "/home/namratha77/neetoPlannerProject/playwright-tests/e2e/poms/login.ts";
import { STORAGE_STATE } from "../../playwright.config";

test.describe("Login page", () => {
  test.setTimeout(120000);
    let loginPage: LoginPage; // Declare loginPage outside of beforeEach

    test.beforeEach(async ({ page }) => {
        const newOTP = faker.string.numeric({ length: 6 });
        // Initialize page objects
        loginPage = new LoginPage(page); // Assign loginPage here
        // Navigate to login page
        //await page.goto("https://app.neetoauth.net/login?redirect_uri=neetoplanner.net");
        await page.goto("/");
    });

    test("should login with the correct credentials", async ({ page }) => { // Remove newOTP from the test argument
        // Test steps
        await loginPage.enterEmail("cpts9gnqty9-planner-preethi_namratha-iiit_bhubaneshwar@bigbinary.com");

        await expect(page.getByRole('heading', { name: 'Verify your email' })).toBeVisible();

        // Use faker here to generate the OTP
        const newOTP = faker.string.numeric({ length: 6 });

        await loginPage.enterOTP(newOTP);

        await expect(page.locator('[data-test-id="main-header"]')).toBeVisible({ timeout: 30000 });

        await page.getByTestId('floating-action-menu-container').getByRole('button').click();
        
        await expect(page.getByRole('heading', { name: 'Preethi Neelap' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();

        await page.context().storageState({ path: STORAGE_STATE });
    });
});








/*// login.spec.ts

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
*/
/*
Iteration: 2
import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker"
import { LoginPage } from "/home/namratha77/neetoPlannerProject/playwright-tests/e2e/poms/login.ts";

test.describe("Login page", () => {
  test.setTimeout(120000);
    let loginPage: LoginPage; // Declare loginPage outside of beforeEach

    test.beforeEach(async ({ page }) => {
        const newOTP = faker.string.numeric({ length: 6 });
        // Initialize page objects
        loginPage = new LoginPage(page); // Assign loginPage here
        // Navigate to login page
        //await page.goto("https://app.neetoauth.net/login?redirect_uri=neetoplanner.net");
        await page.goto("/");
    });

    test("should login with the correct credentials", async ({ page }) => { // Remove newOTP from the test argument
        // Test steps
        await loginPage.enterEmail("cpts9gnqty9-planner-preethi_namratha-iiit_bhubaneshwar@bigbinary.com");

        await expect(page.getByRole('heading', { name: 'Verify your email' })).toBeVisible();

        // Use faker here to generate the OTP
        const newOTP = faker.string.numeric({ length: 6 });

        await loginPage.enterOTP(newOTP);

        await expect(page.locator('[data-test-id="main-header"]')).toBeVisible({ timeout: 30000 });

        await page.getByTestId('floating-action-menu-container').getByRole('button').click();
        
        await expect(page.getByRole('heading', { name: 'Preethi Neelap' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();
    });
});
*/
