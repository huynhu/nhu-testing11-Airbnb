import type { Locator, Page } from "playwright";
import { expect } from "playwright/test";
import { DatePicker } from "../utils/datePicker";

export class HomePage {
  clickDayInMonth(arg0: string) {
    throw new Error("Method not implemented.");
  }
  readonly page: Page;

  // Locator cho button avatar o Header truoc sign in
  readonly userDropDown: Locator;
  // Locator cho menu sau khi click vao avatar button sau sign in
  readonly userMenu: Locator;

  readonly openLoginModal: Locator;
  readonly openSignupModal: Locator;
  readonly modal: Locator;

  //Locators cho cac element tim kiem
  readonly openDestinationsSelector: Locator;
  readonly getDestinationLocator: (city: string) => Locator;

  readonly openDatePicker: Locator;
  readonly datePickerInput: Locator;

  readonly guest: Locator;
  readonly increaseGuestBtn: Locator;
  readonly decreaseGuestBtn: Locator;

  readonly searchButton: Locator;

  //Locator cho cac destination city tren trang chu
  readonly cityCard: (city: string, cityname: string) => Locator;
  //Locator cho menu profile sau khi sign in thanh cong
  readonly dashBoard: Locator;
  readonly signOutBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.signOutBtn = page.getByRole("button", { name: "Sign out" });
    this.userDropDown = page.locator("button:has(img.h-10)");
    this.userMenu = page.locator("#user-menu-button");
    this.modal = this.page.locator(".ant-modal-content");
    this.openSignupModal = page.getByRole("button", { name: "Đăng ký" });
    this.openLoginModal = page.getByRole("button", { name: "Đăng nhập" });

    // Profile menu item for Dashboard, which is visible after signing in
    this.dashBoard = page.getByRole("link", { name: "Dashboard" });
    // Dynamic locator for city cards on the homepage
    this.cityCard = (city: string, cityname: string) =>
      page.locator(`a[href='/rooms/${city}']`, { hasText: cityname });
    // Destination locators
    this.openDestinationsSelector = page.getByText("Địa điểm");
    this.getDestinationLocator = (city: string) => page.getByText(city).first();

    this.searchButton = page.getByLabel("search");
    // Date picker locators
    this.openDatePicker = page.locator(
      "//div[contains(@class,'cursor-pointer')][2]"
    );
    this.datePickerInput = page.locator(".rdrDateRangePickerWrapper");
    // Guest selector locators
    this.guest = page.getByText("Thêm khách");
    this.increaseGuestBtn = page.getByRole("button", {
      name: "+",
    });
    this.decreaseGuestBtn = page.getByRole("button", {
      name: "-",
    });
  }

  async navigateToHomePage() {
    await this.page.goto("/");
    await expect(this.userDropDown).toBeVisible();
  }
  async openSignIn() {
    await this.userDropDown.click();
    await this.openLoginModal.click();
    await expect(this.modal).toBeVisible();
  }
  async openSignUp() {
    await this.userDropDown.click();
    await this.openSignupModal.click();
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

  async clickCityCard(city: string, cityname: string) {
    await expect(this.cityCard(city, cityname)).toBeVisible();
    await this.cityCard(city, cityname).click();
    await expect(this.page).toHaveURL(`/rooms/${city}`, { timeout: 10000 });
  }
  async clickDashBoard() {
    await this.dashBoard.click();
    await this.page.waitForURL("**/info-user");
  }
  // Methods for search functionality
  async selectDestination(destination: string) {
    await this.openDestinationsSelector.click();
    await this.getDestinationLocator(destination).click();
    await expect(this.getDestinationLocator(destination)).toBeVisible();
  }
  async selectDateRange(startDate: string, endDate: string) {
    // You may need to locate and click the start and end date elements in the date picker
    const datePicker = new DatePicker(this.page);
    await datePicker.waitForCalendar();
    await expect(this.datePickerInput).toBeVisible();
    await datePicker.startDateInput.click();
    await datePicker.clickDayInMonth(startDate);
    await datePicker.endDateInput.click();
    await datePicker.clickDayInMonth(endDate);
    // Alternatively, adjust selectors as needed for your date picker implementation
  }

  async selectGuests(guest: number) {
    await this.guest.click();
    for (let i = 1; i < guest; i++) {
      await this.increaseGuestBtn.click();
    }
  }
  async clickSearchBtn() {
    await this.searchButton.click();
  }
}
