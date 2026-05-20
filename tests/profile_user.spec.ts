import test, { expect } from "playwright/test";
import { InfoUserPage } from "../pages/profileUserPage";
import { LoginPage } from "../pages/logInModal";
import { HomePage } from "../pages/homePage";
import { userAccount } from "../data/account";
import { faker } from "@faker-js/faker";

test.describe("Info User Page", () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    await homePage.navigateToHomePage();
    await homePage.openSignIn();
    await loginPage.login(userAccount.email, userAccount.password);
  });
  test("TC01 - Profile User: User can update fullname successfully", async ({
    page,
  }) => {
    const infoUserPage = new InfoUserPage(page);
    const homePage = new HomePage(page);
    const name = faker.person.fullName();
    await homePage.clickUserMenu();
    await homePage.clickDashBoard();
    await infoUserPage.clickChangeInfoBtn();
    await infoUserPage.updateFullName(name);
    await infoUserPage.clickUpdateBtn();
    await infoUserPage.validateInfoUser(name);
  });
  test("TC02 - Profile User: User can update phone number successfully", async ({
    page,
  }) => {
    const infoUserPage = new InfoUserPage(page);
    const homePage = new HomePage(page);
    const phone = "0" + faker.string.numeric(9);
    await homePage.clickUserMenu();
    await homePage.clickDashBoard();
    await infoUserPage.clickChangeInfoBtn();
    await infoUserPage.updatePhone(phone);
    await infoUserPage.clickUpdateBtn();
    await expect(page.getByText("Cập nhật thông tin thành công")).toBeVisible();
  });

  test("TC03 - Profile User: User can update avatar successfully", async ({
    page,
  }) => {
    const infoUserPage = new InfoUserPage(page);
    const homePage = new HomePage(page);
    await homePage.clickUserMenu();
    await homePage.clickDashBoard();
    await infoUserPage.clickChangeAvatarBtn();
    await infoUserPage.uploadAvatar();
  });

  // Edge cases
  test("TC04 - Profile User: User cannot update info with invalid email format", async ({
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

  test("TC05 - Profile User: User cannot update info with empty full name", async ({
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

  test("TC06 - Profile User: User cannot update info with empty phone number", async ({
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

  test("TC07 - Profile User: User cannot update info with empty email", async ({
    page,
  }) => {
    const infoUserPage = new InfoUserPage(page);
    const homePage = new HomePage(page);
    await homePage.clickUserMenu();
    await homePage.clickDashBoard();
    await infoUserPage.clickChangeInfoBtn();
    await infoUserPage.updateEmail("");
    await expect(page.getByText("Vui lòng nhập email!")).toBeVisible();
  });
  test("TC08 - Profile User: User cannot update info with empty DOB", async ({
    page,
  }) => {
    const infoUserPage = new InfoUserPage(page);
    const homePage = new HomePage(page);
    await homePage.clickUserMenu();
    await homePage.clickDashBoard();
    await infoUserPage.clickChangeInfoBtn();
    await infoUserPage.updateDOB();
    await expect(page.getByText("Vui lòng chọn ngày sinh!")).toBeVisible();
  });

  test("TC09 - Profile User: User is able to view history booking room", async ({
    page,
  }) => {
    const infoUserPage = new InfoUserPage(page);
    const homePage = new HomePage(page);
    await homePage.clickUserMenu();
    await homePage.clickDashBoard();
    await infoUserPage.clickChangeInfoBtn();
    await infoUserPage.validateBookedRoomList();
  });
});
