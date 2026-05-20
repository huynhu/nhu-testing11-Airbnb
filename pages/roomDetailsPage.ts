import type { Locator, Page } from "playwright";
import { expect } from "playwright/test";
import { DatePicker } from "../utils/datePicker";

export class RoomDetailsPage {
  readonly page: Page;
  readonly roomTitle: Locator;
  readonly checkInDate: Locator;
  readonly checkOutDate: Locator;

  readonly closeDateRangePicker: Locator;
  readonly guest: Locator;

  readonly increaseGuest: Locator;
  readonly decreaseGuest: Locator;
  readonly guestCount: Locator;

  readonly bookingBtn: Locator;
  // Locators for payment details
  readonly payPerNight: Locator;
  readonly totalBeforeTaxes: Locator;
  readonly cleaningFee: Locator;
  readonly calculatePrice: Locator;

  // Locators for confirmation pop-up
  readonly confirmationPopup: Locator;
  readonly dateRange: Locator;
  readonly guestsInfo: Locator;
  readonly confirmBtn: Locator;

  //Locator for toast message after booking
  readonly toastMessage: Locator;
  //Locator for toast message
  readonly needSignInToast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.roomTitle = page.locator("h2");
    this.checkInDate = page.getByText("Nhận phòng");
    this.checkOutDate = page.getByText("Trả phòng");
    this.closeDateRangePicker = page.getByRole("button", { name: "Close" });

    // Guest selector locators
    this.guest = page.getByText("Thêm khách");
    this.increaseGuest = page.getByRole("button", { name: "+" });
    this.decreaseGuest = page.getByRole("button", { name: "-" });

    //Validate number of guest after selecting
    this.guestCount = page.getByText(/\d+\s*khách/);
    this.bookingBtn = page.getByRole("button", { name: "Đặt phòng" });

    // Locators for payment
    this.payPerNight = page.locator("span:has-text('$')");
    this.calculatePrice = page.locator("p.underline.text-base");

    this.totalBeforeTaxes = page.locator(
      "//p[text()='Total before taxes']/following-sibling::*[1]"
    );
    this.cleaningFee = page.locator(
      "//p[text()='Cleaning fee']/following-sibling::*[1]"
    );

    // Locators for confirmation pop-up
    this.confirmationPopup = page.locator(".ant-modal-content");
    this.dateRange = this.confirmationPopup.getByText(/Ngày sử dụng: .+/);
    this.guestsInfo = this.confirmationPopup.getByText(/Lượng khách: \d+/);
    this.confirmBtn = this.confirmationPopup.getByRole("button", {
      name: "Xác nhận",
    });

    // Locator for toast message
    this.toastMessage = page.getByText("Thêm mới thành công!");
    this.needSignInToast = page.getByText(
      "Vui lòng đăng nhập để tiếp tục đặt phòng."
    );
  }
  async waitForLoadRoomDetails() {
    await expect(this.page).toHaveURL(/\/room-detail\/.+/);
  }
  private parseDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split("/");
    return new Date(`${year}-${month}-${day}`);
  }
  async selectCheckInOutDate(checkInDate: string, checkOutDate: string) {
    const datePicker = new DatePicker(this.page);
    await this.checkInDate.click();

    await datePicker.startDateInput.click();

    await datePicker.clickDayInMonth(checkInDate);
    await datePicker.endDateInput.click();
    await datePicker.clickDayInMonth(checkOutDate);
    await this.closeDateRangePicker.click();
  }
  async countNumberofNights(
    startDate: string,
    endDate: string
  ): Promise<number> {
    const checkInDate = this.parseDate(startDate);
    const checkOutDate = this.parseDate(endDate);
    const diffTime = checkOutDate.getTime() - checkInDate.getTime();
    const totalNights = diffTime / (1000 * 60 * 60 * 24);
    return totalNights;
  }
  async selectGuests(guest: number) {
    for (let i = 1; i < guest; i++) {
      await this.increaseGuest.click();
    }
  }

  async validateGuest(guest: number) {
    await expect(this.guestCount).toHaveText(new RegExp(`${guest}\\s*khách`));
  }
  async getPricePerNight() {
    const raw = await this.payPerNight
      .filter({ hasText: /\d/ })
      .first()
      .innerText();
    const price = Number(raw.replace(/\D/g, ""));
    return price;
  }
  async getTotalNights() {
    const raw = await this.page
      .locator("p.underline.text-base")
      .filter({ hasText: "nights" })
      .innerText();

    const nights = Number(raw.match(/x\s*(\d+)/i)?.[1]);

    return nights;
  }

  async calculateTotalPrice(startDate: string, endDate: string) {
    const cleaningFee = 8;
    const pricePerNight = await this.getPricePerNight();
    const numberOfNights = await this.countNumberofNights(startDate, endDate);
    const totalPrice = pricePerNight * numberOfNights + cleaningFee;
    return totalPrice;
  }
  async validatePayment(startDate: string, endDate: string) {
    const cleaningFee = 8;
    const expectedTotalPrice = await this.calculateTotalPrice(
      startDate,
      endDate
    );
    const totalNights = await this.getTotalNights();
    const totalPriceFromUI = await this.getPricePerNight();
    const displayedTotalPrice = totalNights * totalPriceFromUI + cleaningFee;
    expect(displayedTotalPrice).toEqual(expectedTotalPrice);
  }
  async getFutureDates(
    daysFromToday: number
  ): Promise<{ checkIn: string; checkOut: string }> {
    const today = new Date();
    const checkInDate = new Date(today);
    checkInDate.setDate(today.getDate() + daysFromToday);
    const checkOutDate = new Date(checkInDate);
    checkOutDate.setDate(checkInDate.getDate() + 5); // Default to 5 nights stay

    const formatDate = (date: Date) => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    return {
      checkIn: formatDate(checkInDate),
      checkOut: formatDate(checkOutDate),
    };
  }
}
