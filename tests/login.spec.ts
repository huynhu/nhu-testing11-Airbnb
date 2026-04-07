import test from "@playwright/test";
import { LoginPage } from "../pages/logInPage";

test.describe("Login Page", () => {
  test("TC01: Đăng nhập thành công với thông tin hợp lệ", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto("/");
    await loginPage.login("user@example.com", "password123");
  });
});

test.describe("Login with invalid email", () => {
  test("TC02: Đăng nhập thất bại - Email không hợp lệ", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto("/");
    await loginPage.login("invalid@", "password123");
  });
});

test.describe("Login with invalid password", () => {
  test("TC03: Đăng nhập thất bại - Mật khẩu không hợp lệ", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto("/");
    await loginPage.login("user@example.com", "wrongpassword");
  });
});
