import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker"
import { LoginPage } from "/home/namratha77/neetoPlannerProject/playwright-tests/e2e/poms/login.ts";
import { STORAGE_STATE } from "../../playwright.config";

test.describe("Login page", () => {
  test.setTimeout(120000);
    let loginPage: LoginPage;
    let newOTP : string;

    test.beforeEach(async ({ page }) => {
        newOTP = faker.string.numeric({ length: 6 });
        loginPage = new LoginPage(page); 
        await page.goto("/");
    });

    test("should login with the correct credentials", async ({ page }) => { 

      await test.step("step #1: should be able to enter the email address", async () => {
        await loginPage.enterEmail("cpts9gnqty9-planner-preethi_namratha-iiit_bhubaneshwar@bigbinary.com");
        await expect(page.getByRole('heading', { name: 'Verify your email' })).toBeVisible();
      });

      await test.step("step #2: should be able to input the login otp", async () => {
        await loginPage.enterOTP(newOTP);
        await expect(page.locator('[data-test-id="main-header"]')).toBeVisible({ timeout: 30000 });

      });

      await test.step("step #3: should check if the user has logged in", async () => {
        await page.getByTestId('floating-action-menu-container').getByRole('button').click();
        await expect(page.getByRole('heading', { name: 'Preethi Neelap' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();
      });

        await page.context().storageState({ path: STORAGE_STATE });
    });
});