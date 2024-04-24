import { test } from "../fixtures/fixtures.ts";
import { faker } from "@faker-js/faker";
import { expect } from "@playwright/test";

test.describe("Tasks page", () => {
  let projectName1: string;
  let projectDescription1: string;
  let projectName2: string;
  let projectDescription2: string;
  let otp: string;
  let email: string;
  let userName: string;
  let task1: string;
  let task2: string;

  test.beforeEach(() => {
    email = "cpts9gnqty9-planner-preethi_namratha-iiit_bhubaneshwar@bigbinary.com";
    userName = "Preethi Neelap"
    otp = faker.string.numeric({ length: 6 });
    projectName1 = faker.word.words({ count: 5 });
    projectDescription1 = faker.word.words({ count: 15 });
    projectName2 = faker.word.words({ count: 5 });
    projectDescription2 = faker.word.words({ count: 15 });
    task1 = faker.word.words({ count: 7 });
    task2 = faker.word.words({ count: 7 });
  });

  test("should check the task page", async ({ loginPage, projectPage, page, }) => {
    test.setTimeout(120000);
    await page.goto("https://app.neetoauth.net/login?redirect_uri=neetoplanner.net");
    await loginPage.enterEmail(email)

    await page.locator('.neeto-molecules-sidebar__logo').click();

    await page.getByTestId('navlink-tasks').click();
    await expect(page.getByRole('heading', { name: 'There are no tasks to show.' })).toBeVisible();
    // await page.getByRole('button', { name: 'Add new project' }).click();
    // await page.getByPlaceholder('Enter project name').fill(projectName2);
    // await page.getByPlaceholder('Enter description').fill(projectDescription2);

    // await page.locator('[data-test-id="save-changes-button"]').click();
    
    // await expect(page.getByText(projectName1)).toBeVisible();
    // await expect(page.getByText(projectName2)).toBeVisible();
  });

  test("should be able to create a project and add a task to it", async ({ page }) => {
    test.setTimeout(120000);
    const taskDescription = faker.word.words({ count: 5});
    const taskComment = faker.word.words({ count: 5});

    await page.getByTestId('navlink-projects').click();
    await page.getByRole('button', { name: 'Add new project' }).click();
    await page.getByPlaceholder('Enter project name').fill(projectName1);
    await page.getByPlaceholder('Enter description').fill(projectDescription1);

    await page.locator('[data-test-id="save-changes-button"]').click();

    await page.getByRole('button', { name: 'Add new task' }).click();
    await page.getByTestId('neeto-molecules-autosave-input').fill(task1);
    await page.getByTestId('neeto-molecules-autosave-input-save').click();
    await page.getByRole('row', { name: `${task1}` }).getByRole('button').nth(2).click();
    await page.getByRole('button', { name: `${userName} (you)` }).click();

    await page.getByText(`${task1}`).click();
    await page.getByText('Add a description here.').fill(taskDescription);
    await page.getByRole("button", { name: 'Save changes'}).click();

    await page.locator('div').filter({ hasText: /^CommentsActivitiesParagraphComment$/ }).getByRole('paragraph')
      .fill(taskComment);
    await page.getByRole('button', {name: 'Comment', exact: true}).click();

    // await page.getByTestId('neeto-molecules-header').getByRole('link', { name: 'Projects' }).click();

  });

});