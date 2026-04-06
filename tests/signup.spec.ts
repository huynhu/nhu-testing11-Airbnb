import test from "playwright/test";
import { SignUpPage } from "../pages/signUpPage";

test.describe("Sign Up Page", () => {
  test("Test Sign Up thanh cong", async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    await page.goto("https://demo5.cybersoft.edu.vn/");

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
