import test, { expect } from "playwright/test";
import { LoginPage } from "../../pages/logInModal";
import { adminAccount } from "../../data/account";
import { HomePage } from "../../pages/homePage";
import { SignUpPage } from "../../pages/signUpPage";
import { AdminPage } from "../../pages/adminPage";

test.describe("Authentication login test", () => {
  test("TC01: Log in successfully with valid Admin credentials", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await homePage.navigateToHomePage();
    await homePage.openSignIn();
    await loginPage.login(adminAccount.email, adminAccount.password);

    await expect(homePage.userMenu).toContainText(adminAccount.name);

    const adminMenu = page.getByRole("link", { name: "To page admin" });
    await adminMenu.click();
    await expect(page).toHaveURL(/\/admin$/); // URL phải kết thúc bằng /admin
    const adminPage = new AdminPage(page);
    await expect(adminPage.userManagementMenu).toBeVisible(); // kiểm tra hiển thị menu quản lý người dùng
    await expect(adminPage.locationManagementMenu).toBeVisible(); // kiểm tra hiển thị menu quản lý vị trí
    await expect(adminPage.roomManagementMenu).toBeVisible(); // kiểm tra hiển thị menu quản lý room
    await expect(adminPage.bookingManagementMenu).toBeVisible(); // kiểm tra hiển thị menu quản lý booking
    await expect(adminPage.bookingManagementMenu).toBeVisible(); // kiểm tra hiển thị menu quản lý booking
  });
});
test.describe("Authentication login test with invalid email", () => {
  test("TC02: Log in failed - Invalid email format", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await homePage.navigateToHomePage();
    await homePage.openSignIn();
    await loginPage.login("invalid", "Demo@123");
    await expect(
      page.getByText("Vui lòng nhập đúng định dạng email")
    ).toBeVisible();
  });
});
test.describe("Authentication login test with invalid password", () => {
  test("TC03: Log in failed - Invalid password", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await homePage.navigateToHomePage();
    await homePage.openSignIn();
    await loginPage.login("hana@yopmail.com", "invalid_password");
    await expect(
      page.getByText("Email hoặc mật khẩu không đúng !")
    ).toBeVisible();
  });

  test.describe("Authentication login test with non-existing email", () => {
    test("TC04: Log in failed - Email not found", async ({ page }) => {
      const loginPage = new LoginPage(page);
      const homePage = new HomePage(page);

      await homePage.navigateToHomePage();
      await homePage.openSignIn();
      await loginPage.login("notfound@yopmail.com", "Demo@123");
      await expect(
        page.getByText("Email hoặc mật khẩu không đúng !")
      ).toBeVisible();
    });
  });
  test.describe("Authentication login test with empty email", () => {
    test("TC05: Log in failed - Email is empty", async ({ page }) => {
      const loginPage = new LoginPage(page);
      const homePage = new HomePage(page);

      await homePage.navigateToHomePage();
      await homePage.openSignIn();
      await loginPage.login("", "Demo@123");
      await expect(page.getByText("Vui lòng không bỏ trống")).toBeVisible();
    });
  });
  test.describe("Authentication login test with empty password", () => {
    test("TC06: Log in failed - Password is empty", async ({ page }) => {
      const loginPage = new LoginPage(page);
      const homePage = new HomePage(page);

      await homePage.navigateToHomePage();
      await homePage.openSignIn();
      await loginPage.login("hana@yopmail.com", "");
      await expect(page.getByText("Vui lòng không bỏ trống")).toBeVisible();
    });
  });
});
