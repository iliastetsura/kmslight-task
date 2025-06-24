import { Locator, Page } from '@playwright/test';

export class Header {
    readonly page: Page;
    logoLink: Locator;
    ourSolutionsLink: Locator;
    callCenterLink: Locator;
    onboardingAndTrainingLink: Locator;
    selfServiceLink: Locator;
    fieldServiceLink: Locator;
    integrationsLink: Locator;
    resourcesLink: Locator;
    blogLink: Locator;
    caseStudiesLink: Locator;
    aboutLink: Locator;
    bookADemoButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoLink = page.locator('.header_panel__logo-link');
        this.ourSolutionsLink = page.getByRole('link', { name: 'Our Solutions' });
        this.callCenterLink = page.getByRole('link').filter({ hasText: 'Call Center' });
        this.onboardingAndTrainingLink = page
            .getByRole('link')
            .filter({ hasText: 'Onboarding & Training' });
        this.selfServiceLink = page.getByRole('link').filter({ hasText: 'Self Service' });
        this.fieldServiceLink = page.getByRole('link').filter({ hasText: 'Field Service' });
        this.integrationsLink = page
            .getByRole('banner')
            .getByRole('link', { name: 'Integrations' });
        this.resourcesLink = page.getByRole('banner').getByRole('link', { name: 'Resources' });
        this.blogLink = page.getByRole('banner').getByRole('link').filter({ hasText: 'Blog' });
        this.caseStudiesLink = page.getByRole('banner').getByRole('link', { name: 'Case Studies' });
        this.aboutLink = page.getByRole('banner').getByRole('link', { name: 'About' });
        this.bookADemoButton = page.locator('.header_panel').getByText('Book a Demo');
    }

    async clickResourcesLink() {
        await this.resourcesLink.click();
    }

    async clickOurSolutionsLink() {
        await this.ourSolutionsLink.click();
    }

    async clickBlogLink() {
        await this.blogLink.click();
    }

    async clickBookADemoButton() {
        await this.bookADemoButton.click();
    }

    getNavigationLinks(): Locator[] {
        return [
            this.logoLink,
            this.ourSolutionsLink,
            this.integrationsLink,
            this.caseStudiesLink,
            this.aboutLink,
        ];
    }
}
