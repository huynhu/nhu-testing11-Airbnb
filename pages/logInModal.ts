import type { Page, Locator } from "playwright";
import { expect } from "playwright/test";

export class LoginPage {
  readonly page: Page;

  readonly modal: Locator;

  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modal = this.page.locator(".ant-modal-content");
    this.emailInput = this.modal.locator("#email");
    this.passwordInput = this.modal.locator("#password");
    this.loginBtn = page.getByRole("button", { name: "Đăng nhập" });
  }

  async login(email?: string, password?: string) {
    await expect(this.modal).toBeVisible();
    if (email) {
      await this.emailInput.fill(email);
    }
    if (password) {
      await this.passwordInput.fill(password);
    }
    await this.loginBtn.click();
  }

  async isLoggedInSuccessfully(): Promise<boolean> {
    // Implement logic to check if login was successful, e.g., by checking for a specific element on the page
    return true; // Placeholder, replace with actual implementation
  }
}
