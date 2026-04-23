// utils/datePicker.ts

import { expect, type Locator, type Page } from "@playwright/test";

export class DatePicker {
  readonly page: Page;

  readonly openDatePicker: Locator;

  readonly calendarWrapper: Locator;
  readonly month: Locator;
  readonly date: Locator;
  readonly year: Locator;
  readonly startDateInput: Locator;
  readonly endDateInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openDatePicker = page.locator(
      "//div[contains(@class,'cursor-pointer')][2]"
    );
    this.calendarWrapper = this.page.locator(".rdrCalendarWrapper");
    this.month = this.page.locator(`.rdrMonthPicker select`);
    this.date = this.page.locator(`.rdrDay`);
    this.year = this.page.locator(`.rdrYearPicker select`);
    this.startDateInput = this.page.getByPlaceholder("Early");
    this.endDateInput = this.page.getByPlaceholder("Continuous");
  }

  // private parseDate(dateStr: string): Date {
  //   const [day, month, year] = dateStr.split("/");
  //   return new Date(`${year}-${month}-${day}`);
  // }

  private parseDate(dateStr: string): Date {
    const [dayStr, monthStr, yearStr] = dateStr.split("/");

    if (!dayStr || !monthStr || !yearStr) {
      throw new Error(`Invalid date: ${dateStr}`);
    }

    const day = Number(dayStr);
    const month = Number(monthStr);
    const year = Number(yearStr);

    return new Date(year, month - 1, day);
  }
  async waitForCalendar() {
    await this.openDatePicker.click();
    await expect(this.page.locator(".rdrCalendarWrapper")).toBeVisible();
  }

  async clickMonth(month: string) {
    await this.month.selectOption({ label: month });
  }
  async clickYear(year: number) {
    await this.year.selectOption({ label: year.toString() });
  }

  async clickDay(day: number) {
    await this.page
      .locator(".rdrDay:not(.rdrDayDisabled)")
      .filter({ hasText: new RegExp(`^${day}$`) })
      .first()
      .click();
  }

  async clickDayInMonth(dateStr: string) {
    const date = this.parseDate(dateStr);
    await this.clickMonth(date.toLocaleString("en-US", { month: "long" }));
    await this.clickYear(date.getFullYear());
    await this.clickDay(date.getDate());
  }
}
