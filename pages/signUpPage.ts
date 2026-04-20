import type { Locator, Page } from "playwright";
import { expect } from "playwright/test";

export class SignUpPage {
  readonly page: Page;
  // Locators for Avatar menu icon

  // Locators for Sign Up form fields
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly phoneNumberInput: Locator;
  readonly birthdaySelect: Locator;
  readonly genderOptions: Locator;
  readonly signUpBtn: Locator;
  //Locator for success message or element after sign up
  readonly successMessage: Locator;

  //Locator for error message when sign up fails
  readonly invalidFormatEmail: Locator;
  readonly existedEmail: Locator;
  readonly invalidPhoneNumber: Locator;
  readonly emptyFieldErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.nameInput = page.getByRole("textbox", { name: "name" });
    this.emailInput = page.getByRole("textbox", { name: "email" });
    this.passwordInput = page.getByRole("textbox", { name: "password" });
    this.phoneNumberInput = page.getByRole("textbox", { name: "phone" });
    this.birthdaySelect = page.locator("#birthday");
    this.genderOptions = page.locator("#gender");
    this.signUpBtn = page.getByRole("button", { name: "Đăng ký" });
    // Locators for toast messages
    this.successMessage = page.getByText("Đăng ký thành công");
    this.invalidFormatEmail = page.getByText(
      "Vui lòng nhập đúng định dạng email"
    );
    this.existedEmail = page.getByText("Email đã tồn tại !");
    this.invalidPhoneNumber = page.getByText("Số điện thoại không hợp lệ");
    this.emptyFieldErrorMessage = page.getByText("Vui lòng không bỏ trống");
  }

  async signUp(
    name: string,
    email: string,
    password: string,
    phoneNumber: string,
    birthday: string,
    gender: string
  ) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);

    await this.passwordInput.fill(password);

    await this.phoneNumberInput.fill(phoneNumber);

    await this.genderOptions.click();
    await this.page.getByText(gender, { exact: true }).click();

    await this.birthdaySelect.click();
    await this.birthdaySelect.fill(birthday);

    await this.signUpBtn.click();
  }
  async isSignUpSuccessful(): Promise<boolean> {
    return await this.successMessage.isVisible();
  }

  async isInvalidEmailFormatErrorVisible(): Promise<boolean> {
    return await this.invalidFormatEmail.isVisible();
  }

  async isExistedEmailErrorVisible(): Promise<boolean> {
    return await this.existedEmail.isVisible();
  }

  async isInvalidPhoneNumberErrorVisible(): Promise<boolean> {
    return await this.invalidPhoneNumber.isVisible();
  }

  async isEmptyFieldErrorVisible(): Promise<boolean> {
    return await this.emptyFieldErrorMessage.isVisible();
  }
}
