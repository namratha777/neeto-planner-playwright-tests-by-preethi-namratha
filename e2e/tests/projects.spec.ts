// project.spec.ts

import { test } from "../fixtures/fixtures.ts";
import { faker } from "@faker-js/faker";

test.describe("Projects page", () => {
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

  test("should create a new project", async ({ loginPage, projectPage, page, }) => {
    test.setTimeout(150000);
    await page.goto("https://app.neetoauth.net/login?redirect_uri=neetoplanner.net");
    await loginPage.enterEmail(email);
    await loginPage.enterOTP(otp);
    await projectPage.createProjectAndVerify({ projectName, projectDescription });
  });
});