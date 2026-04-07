import type { Locator, Page } from "playwright";

export class HomePage {
  readonly page: Page;

  readonly cityCard: (city: string) => Locator;
  readonly dashBoard: Locator;
  readonly signOutBtn: Locator;
  readonly userDropDown: Locator;
  readonly userMenu: Locator;
  readonly enterSignUpBtn: Locator;
  readonly enterSignInBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cityCard = (city: string) => page.locator(`a[href='/rooms/${city}']`);
    this.dashBoard = page.getByRole("link", { name: "Dashboard" });
    this.signOutBtn = page.getByRole("button", { name: "Sign out" });
    this.userDropDown = page.locator("button:has(img.h-10)");
    this.userMenu = page.locator("#user-menu-button");
    this.enterSignUpBtn = page.getByRole("button", { name: "Đăng ký" });
    this.enterSignInBtn = page.getByRole("button", { name: "Đăng nhập" });
  }

  async navigateToHomePage() {
    await this.page.goto("/");
  }
  async openSignIn() {
    await this.userDropDown.click();
    await this.enterSignInBtn.click();
  }
  async openSignUp() {
    await this.userDropDown.click();
    await this.enterSignUpBtn.click();
  }
  async clickSignOut() {
    await this.userDropDown.click();
    await this.signOutBtn.click();
  }
  async clickUserDropDown() {
    await this.userDropDown.click();
  }
  async clickUserMenu() {
    await this.userMenu.click();
  }

  async clickCityCard(city: string) {
    await this.cityCard(city).click();
    await this.page.waitForURL(`**/rooms/${city}`);
  }
  async clickDashBoard() {
    await this.dashBoard.click();
    await this.page.waitForURL("**/info-user");
  }
}
