import type { Locator, Page } from "playwright";

export class HomePage {
  readonly page: Page;

  readonly cityCard: (city: string) => Locator;
  readonly dashBoard: Locator;
  readonly signOutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cityCard = (city: string) => page.locator(`a[href='/rooms/${city}']`);
    this.dashBoard = page.getByRole("link", { name: "Dashboard" });
    this.signOutBtn = page.getByRole("button", { name: "Sign out" });
  }

  async navigateToHomePage() {
    await this.page.goto("/");
  }

  async clickCityCard(city: string) {
    await this.cityCard(city).click();
    await this.page.waitForURL(`**/rooms/${city}`);
  }
}
