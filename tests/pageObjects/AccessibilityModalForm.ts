import { Page, Locator } from '@playwright/test';

export class AccessibilityModalForm {
    private page: Page;
    togglerIds: string[];
    accessibilityToolbarButton: Locator;
    highlightLinksAndButtonToggle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.togglerIds = [
            'keyboard',
            'animations',
            'contrast',
            'incfont',
            'decfont',
            'readable',
            'marktitles',
            'underline',
        ];
        this.accessibilityToolbarButton = page.getByRole('button', {
            name: 'Toggle Accessibility Toolbar',
        });
        this.highlightLinksAndButtonToggle = page.getByText('link Highlight Links & Buttons');
    }

    async clickAccessibilityToolbarButton() {
        await this.accessibilityToolbarButton.click();
    }

    async getToggleIds() {
        return this.togglerIds;
    }

    async clickHighlightLinksAndButtonToggle() {
        await this.highlightLinksAndButtonToggle.click();
    }
}
