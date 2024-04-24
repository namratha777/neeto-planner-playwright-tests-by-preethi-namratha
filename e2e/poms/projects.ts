// poms/projects.ts

import { Page, expect } from "@playwright/test";

interface projectDescription {
    projectName: string,
    projectDescription: string,
}

export default class ProjectPage {
    page: Page;

    constructor(page: Page){
        this.page = page;
    }

    createProjectAndVerify = async ( { projectName, projectDescription }: projectDescription ) => {
        await this.page.getByTestId('navlink-projects').click();

        await this.page.getByRole('button', { name: 'Add new project' }).click();
        await this.page.getByPlaceholder('Enter project name').fill(projectName);
        await this.page.getByPlaceholder('Enter description').fill(projectDescription);

        await this.page.locator('[data-test-id="save-changes-button"]').click();
        await expect(this.page.getByText(projectName)).toBeVisible();
    }
}