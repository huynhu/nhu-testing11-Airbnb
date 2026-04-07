import test, { expect } from "playwright/test";
import { SignUpPage } from "../pages/signUpPage";
import { HomePage } from "../pages/homePage";

test.describe("Sign Up Page", () => {
  test("TC01: Đăng ký thành công với thông tin hợp lệ", async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    await homePage.openSignUp();
    await signUpPage.signUp(
      "John Doe",
      "john@example.com",
      "password123",
      1234567890,
      "12/12/1991",
      "Nam"
    );
  });
});

test.describe("Sign Up with invalid email", () => {
  test("Test Sign Up that fails with invalid email", async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    await homePage.openSignUp();
    await signUpPage.signUp(
      "John Doe",
      "invalidemail",
      "password123",
      1234567890,
      "12/12/1991",
      "Nam"
    );
    await expect(signUpPage.invalidFormatEmail).toBeVisible();
  });
});

test.describe("Sign Up with existing email", () => {
  test("TC02: Đăng ký thất bại - Email đã tồn tại", async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    await homePage.openSignUp();
    await signUpPage.signUp(
      "John Doe",
      "john@example.com",
      "password123",
      1234567890,
      "12/12/1991",
      "Nam"
    );
    await expect(signUpPage.existedEmail).toBeVisible();
  });
});

test.describe("Sign Up with invalid phone number", () => {
  test("Test Sign Up that fails with invalid phone number", async ({
    page,
  }) => {
    const signUpPage = new SignUpPage(page);
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    await homePage.openSignUp();
    await signUpPage.signUp(
      "John Doe",
      "john@example.com",
      "password123",
      123456789,
      "12/12/1991",
      "Nam"
    );
    await expect(signUpPage.invalidPhoneNumber).toBeVisible();
  });
});

test.describe("Sign Up with empty fields", () => {
  test("Test Sign Up that fails with empty fields", async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    await homePage.openSignUp();
    await signUpPage.signUp("", "", "", 0, "", "");
    await expect(signUpPage.emptyFieldErrorMessage).toBeVisible();
  });
});
