import type { Locator, Page } from "playwright";

export class SignUpPage {
  readonly page: Page;
  // Locators for Avatar menu icon
  readonly avatarMenu: Locator;
  readonly enterSignUpBtn: Locator;
  // Locators for Sign Up form fields
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly phoneNumberInput: Locator;
  readonly birthdaySelect: Locator;
  readonly genderSelect: Locator;
  readonly signUpBtn: Locator;
  //Locator for success message or element after sign up (if needed)
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.avatarMenu = page.locator("//button/img[@class='h-10']");
    this.enterSignUpBtn = page.getByRole("button", { name: "Đăng ký" });
    this.nameInput = page.getByRole("textbox", { name: "name" });
    this.emailInput = page.getByRole("textbox", { name: "email" });
    this.passwordInput = page.getByRole("textbox", { name: "password" });
    this.phoneNumberInput = page.getByRole("textbox", { name: "phone" });
    this.birthdaySelect = page.getByPlaceholder("Chọn ngày sinh");
    this.genderSelect = page.getByPlaceholder("Chọn giới tính");
    this.signUpBtn = page.getByRole("button", { name: "Đăng ký" });
    this.successMessage = page.locator(".success-message"); // Adjust the selector as needed
  }

  async signUp(
    name: string,
    email: string,
    password: string,
    phoneNumber: number,
    birthday: string,
    gender: string
  ) {
    await this.avatarMenu.click();
    await this.enterSignUpBtn.click();
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.phoneNumberInput.fill(phoneNumber.toString());
    await this.birthdaySelect.fill(birthday);
    await this.genderSelect.selectOption(gender);
    await this.signUpBtn.click();
  }
  async isSignUpSuccessful(): Promise<boolean> {
    await this.successMessage.waitFor({ state: "visible", timeout: 5000 }); // Adjust timeout as needed
    // Implement logic to check if sign-up was successful, e.g., by checking for a specific element on the page
    return true; // Placeholder, replace with actual implementation
  }
}
