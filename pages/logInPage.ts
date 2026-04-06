import type { Page, Locator } from "playwright";

export class LoginPage {
  readonly page: Page;

  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel("Email");
    this.passwordInput = page.getByLabel("Password");
    this.loginBtn = page.getByRole("button", { name: "Đăng nhập" });
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }

  async logout() {
    // Implement logout logic if needed
  }

  async isLoggedInSuccessfully(): Promise<boolean> {
    // Implement logic to check if login was successful, e.g., by checking for a specific element on the page
    return true; // Placeholder, replace with actual implementation
  }
}
