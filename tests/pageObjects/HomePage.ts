import { Page, Locator } from '@playwright/test';
import { Header } from './Header';

export class HomePage {
    private page: Page;
    selfServiceTab: Locator;
    onboardingTrainingTab: Locator;
    fieldServiceTab: Locator;
    callCenterTab: Locator;
    readonly header: Header;

    constructor(page: Page) {
        this.page = page;
        this.header = new Header(page);
        this.selfServiceTab = page.getByRole('tab', { name: 'Self Service' });
        this.onboardingTrainingTab = page.getByRole('tab', { name: 'Onboarding Training' });
        this.fieldServiceTab = page.getByRole('tab', { name: 'Field Service' });
        this.callCenterTab = page.getByRole('tab', { name: 'Call Center' });
    }

    async goToHomePage() {
        await this.page.goto('/');
    }

    async clickSelfServiceTab() {
        await this.selfServiceTab.click();
    }

    async clickOnboardingTrainingTab() {
        await this.onboardingTrainingTab.click();
    }

    async clickFieldServiceTab() {
        await this.fieldServiceTab.click();
    }

    async clickCallCenterTab() {
        await this.callCenterTab.click();
    }
}
