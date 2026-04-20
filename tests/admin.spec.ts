import test, { expect } from "playwright/test";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/logInModal";
import { adminAccount } from "../data/account";
import { AdminPage } from "../pages/adminPage";

test.describe("Admin Page", () => {
  test.beforeEach(async ({ page }) => {
    // 1. Mo trang chu
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    //2. Mo form sign in
    await homePage.openSignIn();

    //3. Login voi tai khoan admin

    const loginPage = new LoginPage(page);
    await loginPage.login(adminAccount.email, adminAccount.password);

    // 4.Mo menu user va click vao menu To page admin

    await homePage.clickUserMenu();
    const adminMenu = page.getByRole("link", { name: "To page admin" });
    await adminMenu.click();
  });
  test("TC01: Admin can access admin page successfully", async ({ page }) => {
    // xác nhận URL sau khi vào trang admin
    const adminPage = new AdminPage(page);
    await expect(page).toHaveURL(/\/admin$/); // URL phải kết thúc bằng /admin
    await expect(adminPage.userManagementMenu).toBeVisible(); // kiểm tra hiển thị menu quản lý người dùng
    await expect(adminPage.locationManagementMenu).toBeVisible(); // kiểm tra hiển thị menu quản lý vị trí
    await expect(adminPage.roomManagementMenu).toBeVisible(); // kiểm tra hiển thị menu quản lý room
    await expect(adminPage.bookingManagementMenu).toBeVisible(); // kiểm tra hiển thị menu quản lý booking
  });
});
