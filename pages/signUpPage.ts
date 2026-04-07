import type { Locator, Page } from "playwright";

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
  readonly signInModal: Locator;
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
    this.successMessage = page.getByText("Đăng ký thành công");
    this.signInModal = page.getByRole("dialog", { name: "Đăng nhập" });
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
    phoneNumber: number,
    birthday: string,
    gender: string
  ) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.phoneNumberInput.fill(phoneNumber.toString());
    await this.birthdaySelect.click();
    await this.birthdaySelect.fill(birthday);
    await this.genderOptions.click();
    await this.page.getByText(gender, { exact: true }).click();
    await this.signUpBtn.click();
  }
  async isSignUpSuccessful(): Promise<boolean> {
    await this.successMessage.waitFor({ state: "visible", timeout: 5000 });
    await this.signInModal.isVisible();
    // Implement logic to check if sign-up was successful, e.g., by checking for a specific element on the page
    return true; // Placeholder, replace with actual implementation
  }
}
