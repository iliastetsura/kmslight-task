import { test as base, Page } from '@playwright/test';
import { AccessibilityModalForm } from '../pageObjects/AccessibilityModalForm';
import { BlogPage } from '../pageObjects/BlogPage';
import { BookADemoPage } from '../pageObjects/BookADemoPage';
import { HomePage } from '../pageObjects/HomePage';

type Fixtures = {
    accessibilityModalForm: AccessibilityModalForm;
    blogPage: BlogPage;
    bookADemoPage: BookADemoPage;
    homePage: HomePage;
};

export const test = base.extend<Fixtures>({
    accessibilityModalForm: async ({ page }, use) => {
        await use(new AccessibilityModalForm(page));
    },

    blogPage: async ({ page }, use) => {
        await use(new BlogPage(page));
    },

    bookADemoPage: async ({ page }, use) => {
        await use(new BookADemoPage(page));
    },

    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
});

export { expect } from '@playwright/test';
