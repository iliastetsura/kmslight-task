import { test, expect, Locator } from '@playwright/test';

test.beforeEach(async({page}) => {
  await page.goto('/');
})

test('Validate Book a Demo link navigation', async ({ page }) => {
    // Click Book a Demo header button
    await page.locator('.header_panel').getByText('Book a Demo').click();

    // Verify the redirection
    await expect(page).toHaveURL('/book-a-demo/');

    // Check that input fields are present and interactable
    await page.getByRole('textbox', { name: 'First name*' }).fill('First');
    await page.getByRole('textbox', { name: 'Last name*' }).fill('Last');
    await page.getByRole('textbox', { name: 'Professional Email*' }).fill('email@example.com');
    await page.getByRole('textbox', { name: 'Phone number*' }).fill('0123456789');
    await page.getByRole('combobox', { name: 'Country/Region*' }).selectOption('Andorra')
    await page.getByRole('textbox', { name: 'Message'}).fill('Test message');
});

test('Validate default state of Accessibility toggles', async ({ page }) => {
    // Locators for header navigation links
    const bookADemoButton = page.locator('.header_panel').getByText('Book a Demo');
    const homePageLogoLink = page.locator('.header_panel__logo-link');
    const ourSolutionsLink = page.getByRole('link', { name: 'Our Solutions' });
    const integrationsLink = page.getByRole('banner').getByRole('link', { name: 'Integrations' });
    const caseStudiessLink = page.getByRole('banner').getByRole('link', { name: 'Case Studies' });
    const aboutLink = page.getByRole('banner').getByRole('link', { name: 'About' });
    const navigationLinks = [homePageLogoLink, ourSolutionsLink, integrationsLink, caseStudiessLink, aboutLink];

    // Locators for transparent and highlight colors
    const transparentColor = 'rgba(0, 0, 0, 0)';
    const highlightColor = 'rgb(255, 233, 1)';

    // Open the Accessibility widget
    await page.getByRole('button', { name: 'Toggle Accessibility Toolbar' }).click();

    // Check the default state of each toggle
    const togglerIds = [
        'keyboard',
        'animations',
        'contrast',
        'incfont',
        'decfont',
        'readable',
        'marktitles',
        'underline'
    ];
    for (const id of togglerIds) {
        expect(await page.locator(`#acwp-toggler-${id}`).isChecked()).toBeFalsy();
    }

    // Utility to get background color
    const getBackgroundColor = async (locator: Locator) =>
        locator.evaluate(element => window.getComputedStyle(element).backgroundColor);

    // Check header navigation links default background color
    for (const navigationLink of navigationLinks) {
        expect(await getBackgroundColor(navigationLink)).toBe(transparentColor);
    }
    expect(await getBackgroundColor(bookADemoButton)).toBe('rgb(27, 206, 153)');
    
    // Turn 'Highlight Links & Buttons' toggle on
    await page.getByText('link Highlight Links & Buttons').click();

    // Wait for header navigation links background color to change to highlight
    await expect.poll(() => getBackgroundColor(bookADemoButton)).toBe(highlightColor);
    for (const navigationLink of navigationLinks) {
        expect(await getBackgroundColor(navigationLink)).toBe(highlightColor);
    }

    // Turn 'Highlight Links & Buttons' toggle off
    await page.getByText('link Highlight Links & Buttons').click();

    // Wait for header navigation links background color to change back to default
    await expect.poll(() => getBackgroundColor(bookADemoButton)).toBe('rgb(27, 206, 153)');
    for (const navigationLink of navigationLinks) {
        expect(await getBackgroundColor(navigationLink)).toBe(transparentColor);
    }
});

test('Validate “I Need Knowledge Management” section', async ({ page }) => {
    // Scroll down to “I Need Knowledge Management For My” section
    await page.mouse.wheel(0, 1500);
    
    // Check that correct text is displayed
    expect(page.getByText('Cut call center holding times by 40%')).toBeVisible;
    
    // Click ‘Self Service’ tab
    await page.getByRole('tab', { name: 'Self Service' }).click();

    // Check that displayed text is changed
    expect(page.getByText('Cut call center holding times by 40%')).not.toBeVisible;
    expect(page.getByText('Empower your customers with 24/7 knowledge')).toBeVisible;

    // Click ‘Onboarding Training’ tab
    await page.getByRole('tab', { name: 'Onboarding Training' }).click();

    // Check that displayed text is changed
    expect(page.getByText('Empower your customers with 24/7 knowledge')).not.toBeVisible;
    expect(page.getByText('Cut onboarding and training costs by up to 70%')).toBeVisible;

    // Click ‘Field Service’ tab
    await page.getByRole('tab', { name: 'Field Service' }).click();

    // Check that displayed text is changed
    expect(page.getByText('Cut onboarding and training costs by up to 70%')).not.toBeVisible;
    expect(page.getByText('Reduce your field teams time-on-site by 60%')).toBeVisible;

    // Click ‘Call Center’ tab
    await page.getByRole('tab', { name: 'Call Center' }).click();

    // Check that displayed text is changed
    expect(page.getByText('Reduce your field teams time-on-site by 60%')).not.toBeVisible;
    expect(page.getByText('Cut call center holding times by 40%')).toBeVisible;
});

test('Validate Our Solutions navigation links', async ({ page }) => {
    const callCenterLink = page.getByRole('link').filter({ hasText: 'Call Center'});
    const onboardingAndTrainingLink = page.getByRole('link').filter({ hasText: 'Onboarding & Training'});
    const selfServiceLink = page.getByRole('link').filter({ hasText: 'Self Service'});
    const fieldServiceLink = page.getByRole('link').filter({ hasText: 'Field Service'});

    // Check that navigation links are not displayed by default
    expect(callCenterLink).not.toBeVisible;
    expect(onboardingAndTrainingLink).not.toBeVisible;
    expect(selfServiceLink).not.toBeVisible;
    expect(fieldServiceLink).not.toBeVisible;

    // Click ‘Our Solutions’ link
    await page.getByRole('link', { name: 'Our Solutions' }).click();
    
    // Check that navigation links are displayed and contain correct links
    expect(callCenterLink).toBeVisible;
    await expect(callCenterLink).toHaveAttribute('href', 'https://kmslh.com/solution-call-center/');
    expect(onboardingAndTrainingLink).toBeVisible;
    await expect(onboardingAndTrainingLink).toHaveAttribute('href', 'https://kmslh.com/solution-onboarding/');
    expect(selfServiceLink).toBeVisible;
    await expect(selfServiceLink).toHaveAttribute('href', 'https://kmslh.com/solution-self-service/');
    expect(fieldServiceLink).toBeVisible;
    await expect(fieldServiceLink).toHaveAttribute('href', 'https://kmslh.com/solution-field-service/');
});
