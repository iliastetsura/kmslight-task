import { Locator } from '@playwright/test';

export const getBackgroundColor = async (locator: Locator): Promise<string> => {
    return locator.evaluate((element) => window.getComputedStyle(element).backgroundColor);
};
