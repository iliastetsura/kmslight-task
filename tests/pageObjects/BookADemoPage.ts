import { Page, Locator } from '@playwright/test';

export class BookADemoPage {
    private page: Page;
    firstNameInput: Locator;
    lastNameInput: Locator;
    emailInput: Locator;
    phoneInput: Locator;
    jobTitleInput: Locator;
    countryDropDown: Locator;
    messageInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.getByRole('textbox', { name: 'First name*' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last name*' });
        this.emailInput = page.getByRole('textbox', { name: 'Professional Email*' });
        this.phoneInput = page.getByRole('textbox', { name: 'Phone number*' });
        this.jobTitleInput = page.getByRole('textbox', { name: 'Job Title*' });
        this.countryDropDown = page.getByRole('combobox', { name: 'Country/Region*' });
        this.messageInput = page.getByRole('textbox', { name: 'Message' });
    }

    async fillFirstNameInput(firstName: string) {
        await this.firstNameInput.fill(firstName);
    }

    async fillLastNameInput(lastName: string) {
        await this.lastNameInput.fill(lastName);
    }

    async fillEmailInput(email: string) {
        await this.emailInput.fill(email);
    }

    async fillPhoneInput(phone: string) {
        await this.phoneInput.fill(phone);
    }

    async fillJobTitleInput(jobTitle: string) {
        await this.jobTitleInput.fill(jobTitle);
    }

    async selectCountryDropDown(country: string) {
        await this.countryDropDown.selectOption({ label: country });
    }

    async fillMessageInput(message: string) {
        await this.messageInput.fill(message);
    }

    async fillBookADemoForm(
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        jobTitle: string,
        country: string,
        message: string,
    ) {
        await this.fillFirstNameInput(firstName);
        await this.fillLastNameInput(lastName);
        await this.fillEmailInput(email);
        await this.fillPhoneInput(phone);
        await this.fillJobTitleInput(jobTitle);
        await this.selectCountryDropDown(country);
        await this.fillMessageInput(message);
    }
}
