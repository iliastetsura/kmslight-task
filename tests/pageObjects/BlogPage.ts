import { Page, Locator } from '@playwright/test';

export class BlogPage {
    private page: Page;
    searchInput: Locator;
    searchButton: Locator;
    readonly searchResultCard: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.getByRole('searchbox', { name: 'Search' });
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.searchResultCard = page.locator('[data-elementor-type="loop-item"]');
    }

    async clickSearchInput() {
        await this.searchInput.click();
    }

    async fillSearchInput(query: string) {
        await this.searchInput.fill(query);
    }

    async clickSearchButton() {
        await this.searchButton.click();
    }
}
