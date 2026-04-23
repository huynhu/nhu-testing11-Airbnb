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
    await infoUserPage.updateFullName("Henry Ba Khiem");
    await infoUserPage.clickUpdateBtn();
    await expect(homePage.userMenu).toContainText("Henry Ba Khiem");
  });
  test("TC24: User can update phone number successfully", async ({ page }) => {
    const infoUserPage = new InfoUserPage(page);
    const homePage = new HomePage(page);
    await homePage.clickUserMenu();
    await homePage.clickDashBoard();
    await infoUserPage.clickChangeInfoBtn();
    await infoUserPage.updatePhone("0932607326");
    await infoUserPage.clickUpdateBtn();
    await expect(page.getByText("Cập nhật thông tin thành công")).toBeVisible();
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
    await infoUserPage.updateEmail("email");
    await expect(page.getByText("Email không hợp lệ!")).toBeVisible();
  });

  test("TC28: User cannot update info with invalid phone number", async ({
    page,
  }) => {
    const infoUserPage = new InfoUserPage(page);
    const homePage = new HomePage(page);
    await homePage.clickUserMenu();
    await homePage.clickDashBoard();
    await infoUserPage.clickChangeInfoBtn();
    await infoUserPage.updatePhone("090990");
    await expect(page.getByText("Sai định dạng số điện thoại!")).toBeVisible();
  });

  test("TC27: User cannot update info with empty full name", async ({
    page,
  }) => {
    const infoUserPage = new InfoUserPage(page);
    const homePage = new HomePage(page);
    await homePage.clickUserMenu();
    await homePage.clickDashBoard();
    await infoUserPage.clickChangeInfoBtn();
    await infoUserPage.updateFullName("");
    await expect(page.getByText("Vui lòng nhập họ tên!")).toBeVisible({
      timeout: 5000,
    });
  });

  test("TC28: User cannot update info with empty phone number", async ({
    page,
  }) => {
    const infoUserPage = new InfoUserPage(page);
    const homePage = new HomePage(page);
    await homePage.clickUserMenu();
    await homePage.clickDashBoard();
    await infoUserPage.clickChangeInfoBtn();
    await infoUserPage.updatePhone("");
    await expect(page.getByText("Vui lòng nhập số điện thoại!")).toBeVisible();
  });

  test("TC28: User cannot update info with empty email", async ({ page }) => {
    const infoUserPage = new InfoUserPage(page);
    const homePage = new HomePage(page);
    await homePage.clickUserMenu();
    await homePage.clickDashBoard();
    await infoUserPage.clickChangeInfoBtn();
    await infoUserPage.updateEmail("");
    await expect(page.getByText("Vui lòng nhập email!")).toBeVisible();
  });
  // test("TC28: User cannot update info with empty DOB", async ({ page }) => {
  //   const infoUserPage = new InfoUserPage(page);
  //   const homePage = new HomePage(page);
  //   await homePage.clickUserMenu();
  //   await homePage.clickDashBoard();
  //   await infoUserPage.clickChangeInfoBtn();
  //   await infoUserPage.updateDOB("");
  //   await expect(page.getByText("Vui lòng chọn ngày sinh!")).toBeVisible();
  // });
  // test("TC28: User cannot update info with empty gender", async ({ page }) => {
  //   const infoUserPage = new InfoUserPage(page);
  //   const homePage = new HomePage(page);
  //   await homePage.clickUserMenu();
  //   await homePage.clickDashBoard();
  //   await infoUserPage.clickChangeInfoBtn();
  //   await infoUserPage.updateGender("");
  //   await expect(page.getByText("Vui lòng chọn giới tính")).toBeVisible();
  // });

  test("TC29: User is able to view history booking room", async ({ page }) => {
    const infoUserPage = new InfoUserPage(page);
    const homePage = new HomePage(page);
    await homePage.clickUserMenu();
    await homePage.clickDashBoard();
    await infoUserPage.clickChangeInfoBtn();
    await infoUserPage.validateBookedRoomList();
  });
});
