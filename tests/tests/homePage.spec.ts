import { test, expect } from '../fixtures/fixtures';
import { faker } from '@faker-js/faker';
import { getBackgroundColor } from '../utils/styleUtils';

test.beforeEach(async ({ homePage }) => {
    await homePage.goToHomePage();
});

test.describe('Major flows', () => {
    test('Validate Book a Demo link navigation @ui @smoke', async ({
        bookADemoPage,
        homePage,
        page,
    }) => {
        // Generate test data
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const professionalEmail = faker.internet.email({
            firstName: firstName,
            lastName: lastName,
            provider: 'kmslh.com',
        });
        const phone = faker.phone.number();
        const jobTitle = faker.person.jobTitle();
        const country = faker.location.country();
        const message = faker.word.adjective();

        // Navigate to Book a Demo page
        await homePage.header.clickBookADemoButton();

        // Verify the redirection
        await expect(page).toHaveURL('/book-a-demo/');

        // Check that input fields are present and interactable
        await bookADemoPage.fillBookADemoForm(
            firstName,
            lastName,
            professionalEmail,
            phone,
            jobTitle,
            country,
            message,
        );
    });

    test('Validate Blog Search @ui @search @smoke', async ({ blogPage, homePage, page }) => {
        // Click Knowledge Center header link
        homePage.header.clickKnowledgeCenterLink();

        // Navigate to Blog page
        homePage.header.clickBlogLink();

        // Search for "KMS Lighthouse" text
        await blogPage.clickSearchInput();
        await blogPage.fillSearchInput('KMS Lighthouse');
        await blogPage.clickSearchButton();
        await expect(page).toHaveURL('/?s=KMS+Lighthouse');

        // Check that search results contain at least 1 element
        await page.mouse.wheel(0, 500);
        const searchResultCard = blogPage.searchResultCard;
        const searchResultCardCount = await searchResultCard.count();
        expect(searchResultCardCount).toBeGreaterThan(0);

        // Check that each search result contains searched text
        for (let i = 0; i < searchResultCardCount; i++) {
            const searchResultCardText = await searchResultCard.nth(i).textContent();
            expect(searchResultCardText).toContain('KMS Lighthouse');
        }
    });
});

test.describe('Content checks', () => {
    test('Validate default state of Accessibility toggles @ui @accessibility', async ({
        accessibilityModalForm,
        homePage,
        page,
    }) => {
        // Locators for header navigation links
        const navigationLinks = homePage.header.getNavigationLinks();
        const bookADemoButton = homePage.header.bookADemoButton;

        // Locators for transparent and highlight colors
        const transparentColor = 'rgba(0, 0, 0, 0)';
        const highlightColor = 'rgb(255, 233, 1)';

        // Open the Accessibility widget
        await accessibilityModalForm.clickAccessibilityToolbarButton();

        // Check the default state of each toggle
        const togglerIds = await accessibilityModalForm.getToggleIds();
        for (const id of togglerIds) {
            expect(await page.locator(`#acwp-toggler-${id}`).isChecked()).toBeFalsy();
        }

        // Check header navigation links default background color
        for (const navigationLink of navigationLinks) {
            expect(await getBackgroundColor(navigationLink)).toBe(transparentColor);
        }
        expect(await getBackgroundColor(bookADemoButton)).toBe('rgb(27, 206, 153)');

        // Turn 'Highlight Links & Buttons' toggle on
        await accessibilityModalForm.clickHighlightLinksAndButtonToggle();

        // Wait for header navigation links background color to change to highlight
        for (const navigationLink of navigationLinks) {
            expect(await getBackgroundColor(navigationLink)).toBe(highlightColor);
        }
        await expect.poll(() => getBackgroundColor(bookADemoButton)).toBe(highlightColor);

        // Turn 'Highlight Links & Buttons' toggle off
        await accessibilityModalForm.clickHighlightLinksAndButtonToggle();

        // Wait for header navigation links background color to change back to default
        for (const navigationLink of navigationLinks) {
            expect(await getBackgroundColor(navigationLink)).toBe(transparentColor);
        }
        await expect.poll(() => getBackgroundColor(bookADemoButton)).toBe('rgb(27, 206, 153)');
    });

    test('Validate “I Need Knowledge Management” section @ui @contentChecks', async ({
        homePage,
        page,
    }) => {
        // Scroll down to “I Need Knowledge Management For My” section
        await page.mouse.wheel(0, 1500);

        // Check that correct text is displayed
        expect(page.getByText('Cut call center holding times by 40%')).toBeVisible;

        // Click ‘Self Service’ tab
        await homePage.clickSelfServiceTab();

        // Check that displayed text is changed
        expect(page.getByText('Cut call center holding times by 40%')).not.toBeVisible;
        expect(page.getByText('Empower your customers with 24/7 knowledge')).toBeVisible;

        // Click ‘Onboarding Training’ tab
        await homePage.clickOnboardingTrainingTab();

        // Check that displayed text is changed
        expect(page.getByText('Empower your customers with 24/7 knowledge')).not.toBeVisible;
        expect(page.getByText('Cut onboarding and training costs by up to 70%')).toBeVisible;

        // Click ‘Field Service’ tab
        await homePage.clickFieldServiceTab();

        // Check that displayed text is changed
        expect(page.getByText('Cut onboarding and training costs by up to 70%')).not.toBeVisible;
        expect(page.getByText('Reduce your field teams time-on-site by 60%')).toBeVisible;

        // Click ‘Call Center’ tab
        await homePage.clickCallCenterTab();

        // Check that displayed text is changed
        expect(page.getByText('Reduce your field teams time-on-site by 60%')).not.toBeVisible;
        expect(page.getByText('Cut call center holding times by 40%')).toBeVisible;
    });

    test('Validate Our Solutions navigation links @ui @navigation @contentChecks', async ({
        homePage,
    }) => {
        const callCenterLink = homePage.header.callCenterLink;
        const onboardingAndTrainingLink = homePage.header.onboardingAndTrainingLink;
        const selfServiceLink = homePage.header.selfServiceLink;
        const fieldServiceLink = homePage.header.fieldServiceLink;

        // Check that navigation links are not displayed by default
        expect(callCenterLink).not.toBeVisible;
        expect(onboardingAndTrainingLink).not.toBeVisible;
        expect(selfServiceLink).not.toBeVisible;
        expect(fieldServiceLink).not.toBeVisible;

        // Click ‘Our Solutions’ link
        await homePage.header.clickOurSolutionsLink();

        // Check that navigation links are displayed and contain correct links
        expect(callCenterLink).toBeVisible;
        await expect(callCenterLink).toHaveAttribute(
            'href',
            'https://kmslh.com/solution-call-center/',
        );
        expect(onboardingAndTrainingLink).toBeVisible;
        await expect(onboardingAndTrainingLink).toHaveAttribute(
            'href',
            'https://kmslh.com/solution-onboarding/',
        );
        expect(selfServiceLink).toBeVisible;
        await expect(selfServiceLink).toHaveAttribute(
            'href',
            'https://kmslh.com/solution-self-service/',
        );
        expect(fieldServiceLink).toBeVisible;
        await expect(fieldServiceLink).toHaveAttribute(
            'href',
            'https://kmslh.com/solution-field-service/',
        );
    });
});
