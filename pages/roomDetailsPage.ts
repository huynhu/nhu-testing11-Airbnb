import type { Locator, Page } from "playwright";
import { expect } from "playwright/test";

export class RoomDetailsPage {
  readonly page: Page;
  readonly roomTitle: Locator;
  readonly checkInDate: Locator;
  readonly checkOutDate: Locator;
  readonly increaseGuest: Locator;
  readonly decreaseGuest: Locator;
  readonly guestCount: (numberGuest: number) => Locator;

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

  constructor(page: Page) {
    this.page = page;
    this.roomTitle = page.locator("h2");
    this.checkInDate = page.getByText("Nhận phòng");
    this.checkOutDate = page.getByText("Trả phòng");
    this.increaseGuest = page.getByRole("button", { name: "+" });
    this.decreaseGuest = page.getByRole("button", { name: "-" });
    this.guestCount = (numberGuest: number) =>
      page.locator(`${numberGuest} khách`);
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
  }
  async waitForLoadRoomDetails() {
    await expect(this.page).toHaveURL(/\/room-detail\/.+/);
  }
  private parseDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split("/");
    return new Date(`${year}-${month}-${day}`);
  }
  async countNumberofNights(
    startDate: string,
    endDate: string
  ): Promise<number> {
    const checkInDate = this.parseDate(startDate);
    const checkOutDate = this.parseDate(endDate);
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    const totalNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return totalNights;
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
    const raw = await this.payPerNight
      .filter({ hasText: /\d/ })
      .first()
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
    const expectedTotalPrice = await this.calculateTotalPrice(
      startDate,
      endDate
    );
    const displayedTotalPriceText = await this.totalBeforeTaxes.innerText();

    if (!displayedTotalPriceText) {
      throw new Error("Total price not found");
    }
    const displayedTotalPriceMatch = displayedTotalPriceText.match(/[\d,]+/);
    if (!displayedTotalPriceMatch) {
      throw new Error(
        `Unable to extract total price from text: ${displayedTotalPriceText}`
      );
    }
    const displayedTotalPrice = parseInt(
      displayedTotalPriceMatch[0].replace(/,/g, "")
    );
    console.log(displayedTotalPrice);
    expect(displayedTotalPrice).toEqual(expectedTotalPrice);
  }
}
