import test, { expect } from "playwright/test";
import { InfoUserPage } from "../pages/profileUserPage";
import { LoginPage } from "../pages/logInModal";
import { HomePage } from "../pages/homePage";
import { userAccount } from "../data/account";

test.describe("Info User Page", () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    await homePage.navigateToHomePage();
    await homePage.openSignIn();
    await loginPage.login(userAccount.email, userAccount.password);
  });
  test("TC23: User can update fullname successfully", async ({ page }) => {
    const infoUserPage = new InfoUserPage(page);
    const homePage = new HomePage(page);
    await homePage.clickUserMenu();
    await homePage.clickDashBoard();
    await infoUserPage.clickChangeInfoBtn();
    await infoUserPage.editInfoUser({ fullName: "Henry Ba Khiem" });
    await expect(homePage.userMenu).toContainText("Henry Ba Khiem");
  });
  test("TC24: User can update phone number successfully", async ({ page }) => {
    const infoUserPage = new InfoUserPage(page);
    const homePage = new HomePage(page);
    await homePage.clickUserMenu();
    await homePage.clickDashBoard();
    await infoUserPage.clickChangeInfoBtn();
    await infoUserPage.editInfoUser({ phone: "1234567890" });
    await expect(homePage.userMenu).toContainText("1234567890");
  });

  test("TC25: User can update avatar successfully", async ({ page }) => {
    const infoUserPage = new InfoUserPage(page);
    const homePage = new HomePage(page);
    await homePage.clickUserMenu();
    await homePage.clickDashBoard();
    await infoUserPage.clickChangeAvatarBtn();
    await infoUserPage.uploadAvatar();
  });

  // Edge cases
  test("TC26: User cannot update info with invalid email format", async ({
    page,
  }) => {
    const infoUserPage = new InfoUserPage(page);
    const homePage = new HomePage(page);
    await homePage.clickUserMenu();
    await homePage.clickDashBoard();
    await infoUserPage.clickChangeInfoBtn();
    await infoUserPage.editInfoUser({ email: "invalid_email" });
    await expect(
      page.getByText("Vui lòng nhập đúng định dạng email")
    ).toBeVisible();
  });

  test("TC27: User cannot update info with empty full name", async ({
    page,
  }) => {
    const infoUserPage = new InfoUserPage(page);
    const homePage = new HomePage(page);
    await homePage.clickUserMenu();
    await homePage.clickDashBoard();
    await infoUserPage.clickChangeInfoBtn();
    await infoUserPage.editInfoUser({ fullName: "" });
    await expect(page.getByText("Vui lòng không bỏ trống")).toBeVisible();
  });

  test("TC28: User cannot update info with invalid phone number", async ({
    page,
  }) => {
    const infoUserPage = new InfoUserPage(page);
    const homePage = new HomePage(page);
    await homePage.clickUserMenu();
    await homePage.clickDashBoard();
    await infoUserPage.clickChangeInfoBtn();
    await infoUserPage.editInfoUser({ phone: "invalid_phone" });
    await expect(page.getByText("Số điện thoại không hợp lệ")).toBeVisible();
  });
});
