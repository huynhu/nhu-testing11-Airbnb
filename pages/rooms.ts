import { el } from "@faker-js/faker/.";
import type { Locator, Page } from "playwright";
import { expect } from "playwright/test";

export class RoomsPage {
  readonly page: Page;

  readonly roomCards: Locator;
  readonly actualText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.roomCards = this.page.locator("//div[@class='ant-card-body']");
    this.actualText = this.page.getByText(/Có \d+ chỗ ở tại/);
  }
  // ✅ FIXED — wait for DOM attachment first, then count
  async waitForCards(minCount = 1, timeout = 15_000) {
    // Layer 1: Playwright built-in — waits until element exists in DOM
    await expect(this.roomCards.first()).toBeAttached({ timeout });

    // Layer 2: page.waitForFunction — polls until count stabilises
    //          (React may render cards in batches)
    await this.page.waitForFunction(
      ({ selector, min }) => document.querySelectorAll(selector).length >= min,
      { selector: "div.ant-card-body", min: minCount },
      { timeout }
    );
  }

  // ✅ Read text the way the browser renders it to the user

  async countResults(): Promise<number> {
    await this.waitForCards();
    return this.roomCards.count();
  }
  async getSummaryText(city?: string, startDate?: string, endDate?: string) {
    const numberOfResult = await this.countResults();
    const summaryText = `Có ${numberOfResult} chỗ ở tại ${city} • ${startDate} – ${endDate}`;
    return summaryText;
  }
  async validateResult(city?: string, startDate?: string, endDate?: string) {
    const actualText = await this.actualText.innerText();
    const expectedText = await this.getSummaryText(city, startDate, endDate);
    await expect(actualText.trim()).toBe(expectedText);
    console.log(actualText, expectedText);
  }

  async clickCardToOpenRoomDetails() {
    await this.roomCards.first().click();
    await expect(this.page).toHaveURL(/\/room-detail\/.+/);
  }
}
