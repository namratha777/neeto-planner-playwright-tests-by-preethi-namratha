// Fixtures.ts

import { test as base } from "@playwright/test";
import { LoginPage } from "../poms/login";
import ProjectPage from "../poms/projects";

interface ExtendedFixtures {
  loginPage: LoginPage;
  projectPage: ProjectPage
}

export const test = base.extend<ExtendedFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  projectPage: async ({ page }, use) => {
    const projectPage = new ProjectPage(page);
    await use(projectPage);
  }

});