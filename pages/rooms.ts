import type { Locator, Page } from "playwright";
import { expect } from "playwright/test";

export class RoomsPage {
  readonly page: Page;

  readonly roomCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.roomCards = this.page
      .getByRole("button", { name: "Guest favorite" })
      .first();
  }

  async validateRoomsPage(
    city: string,
    results: number,
    startDate: string,
    endDate: string
  ) {
    await expect(this.page).toHaveURL(`/rooms/${city}`);
    await expect(
      this.page.getByText(
        `Có ${results} chỗ ở tại ${city}  • ${startDate} - ${endDate}`
      )
    ).toBeVisible();
  }

  async clickCardToOpenRoomDetails() {
    await this.roomCards.click();
    await expect(this.page).toHaveURL(/\/room-detail\/.+/);
  }
}
