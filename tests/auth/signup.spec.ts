import test, { expect } from "playwright/test";
import { SignUpPage } from "../../pages/signUpPage";
import { HomePage } from "../../pages/homePage";
import {
  userGenerator,
  type User,
} from "../../utils/dataGenerator/userGenerator";
import { signUpUser } from "../../api/user.api";
import { apiUserGenerator } from "../../utils/dataGenerator/apiUserGenerator";

const user = userGenerator();

test.describe("Sign Up Page", () => {
  test("TC01: Sign Up with valid information", async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    const homePage = new HomePage(page);
    const user = userGenerator();
    await homePage.navigateToHomePage();
    await homePage.openSignUp();
    await signUpPage.signUp(
      user.name,
      user.email,
      user.password,
      user.phone,
      user.birthday,
      user.gender
    );
    await signUpPage.isSignUpSuccessful();
  });
});

test.describe("Sign Up with invalid email", () => {
  test("TC02: Test Sign Up that fails with invalid email", async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    const homePage = new HomePage(page);
    const user = userGenerator();
    // Navigate to home page and open sign up form
    await homePage.navigateToHomePage();
    await homePage.openSignUp();
    // Input data and submit form with invalid email
    await signUpPage.signUp(
      user.name,
      "invalid",
      user.password,
      user.phone,
      user.birthday,
      user.gender
    );
    // Assert that the appropriate error message is displayed
    await signUpPage.invalidFormatEmail.waitFor({
      state: "visible",
      timeout: 5000,
    });
  });
});

test.describe("Sign Up with invalid phone number", () => {
  test("TC04: Test Sign Up that fails with invalid phone number", async ({
    page,
  }) => {
    const signUpPage = new SignUpPage(page);
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    await homePage.openSignUp();
    await signUpPage.signUp(
      user.name,
      user.email,
      user.password,
      "1323541",
      user.birthday,
      user.gender
    );
    await signUpPage.invalidPhoneNumber.waitFor({
      state: "visible",
      timeout: 5000,
    });
  });
});

test.describe("Sign Up with existing email", () => {
  test("TC03: Sign Up that fails with existing email", async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    const homePage = new HomePage(page);
    const apiuser = apiUserGenerator();
    const uiuser = userGenerator({
      email: apiuser.email, // Ensure the UI user has the same email as the API user
    });
    const res1 = await signUpUser(apiuser);
    // Extract the email from the API response
    const res1Body = await res1.json();
    await homePage.navigateToHomePage();
    await homePage.openSignUp();
    await signUpPage.signUp(
      uiuser.name,
      uiuser.email,
      uiuser.password,
      uiuser.phone,
      uiuser.birthday,
      uiuser.gender
    );
    await signUpPage.existedEmail.waitFor({ state: "visible", timeout: 5000 });
  });
});
