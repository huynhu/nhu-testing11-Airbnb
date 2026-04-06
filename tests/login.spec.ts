import test from "@playwright/test";
import { LoginPage } from "../pages/logInPage";

test.describe("Login Page", () => {
  test("Test Log in thanh cong", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto("https://demo5.cybersoft.edu.vn/");
    await loginPage.login("user@example.com", "password123");
  });
});

test.describe("Login with invalid email", () => {
  test("Test Log in that fails with invalid email", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto("https://demo5.cybersoft.edu.vn/");
    await loginPage.login("invalid@", "password123");
  });
});

test.describe("Login with invalid password", () => {
  test("Test Log in that fails with invalid password", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto("https://demo5.cybersoft.edu.vn/");
    await loginPage.login("user@example.com", "wrongpassword");
  });
});
