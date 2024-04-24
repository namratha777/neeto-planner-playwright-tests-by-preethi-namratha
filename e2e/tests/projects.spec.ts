// project.spec.ts

import { test } from "../fixtures/fixtures.ts";
import { faker } from "@faker-js/faker";

test.describe("Tasks page", () => {
  let projectName: string;
  let projectDescription: string;
  let otp: string;
  let email: string;

  test.beforeEach(() => {
    email = "cpts9gnqty9-planner-preethi_namratha-iiit_bhubaneshwar@bigbinary.com";
    otp = faker.string.numeric({ length: 6 });
    projectName = faker.word.words({ count: 5 });
    projectDescription = faker.word.words({ count: 15 });

  });

  test("should create a new task with creator as the assignee", async ({ loginPage, projectPage, page, }) => {
    test.setTimeout(150000);
    await page.goto("https://app.neetoauth.net/login?redirect_uri=neetoplanner.net");
    await loginPage.enterEmail(email);
    await loginPage.enterOTP(otp);
    await projectPage.createProjectAndVerify({ projectName, projectDescription });
  });
});





/*
// project.spec.ts without poms

import { test } from "/home/namratha77/neetoPlannerProject/playwright-tests/e2e/fixtures/fixtures.ts";
import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("Tasks page", () => {
  let projectName: string;
  let projectDescription: string;
  let otp: string;
  let email: string;

  test.beforeEach(() => {
    email = "cpts9gnqty9-planner-preethi_namratha-iiit_bhubaneshwar@bigbinary.com";
    otp = faker.string.numeric({ length: 6 });
    projectName = faker.word.words({ count: 5 });
    projectDescription = faker.word.words({ count: 15 });
  });

  test("should create a new task with creator as the assignee", async ({ loginPage, page, }) => {
    test.setTimeout(120000);
    await page.goto("https://app.neetoauth.net/login?redirect_uri=neetoplanner.net");
    await loginPage.enterEmail(email);
    await loginPage.enterOTP(otp);


    await page.getByTestId('navlink-projects').click();

    await page.getByRole('button', { name: 'Add new project' }).click();
    await page.getByPlaceholder('Enter project name').fill(projectName);
    await page.getByPlaceholder('Enter description').fill(projectDescription);

    await page.locator('[data-test-id="save-changes-button"]').click();
    await expect(page.getByText(projectName)).toBeVisible();
  });
});
*/
