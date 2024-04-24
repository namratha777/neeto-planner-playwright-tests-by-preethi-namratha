import { defineConfig, devices } from '@playwright/test';
export const STORAGE_STATE = "./auth/session.json";
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    baseURL: "https://app.neetoauth.net/login?redirect_uri=neetoplanner.net",
  },


  projects: [
    {
        name: "login",
        testMatch: "**/login.setup.ts",
    },
    {
      name: "teardown",
      use: { ...devices["Desktop Chrome"] },
      testMatch: "**/global.teardown.ts",
    },
    {
        name: "Other tests",
        dependencies: ["login"],
        teardown: "teardown",
        testMatch: "**/*.spec.ts",
        testIgnore: "**/login.setup.ts",
        use: {
          storageState: STORAGE_STATE,
      },
    },
],
});
