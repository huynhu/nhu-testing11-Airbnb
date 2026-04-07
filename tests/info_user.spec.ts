import test from "playwright/test";
import { InfoUserPage } from "../pages/infoUserPage";
import { LoginPage } from "../pages/logInPage";
import { HomePage } from "../pages/homePage";

test.describe("Info User Page", () => {
  test("TC: User can edit fullname successfully", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const infoUserPage = new InfoUserPage(page);
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    await homePage.openSignIn();
    await loginPage.login("henry@yopmail.com", "Demo@123");
    await homePage.clickUserMenu();
    await homePage.clickDashBoard();
    await infoUserPage.clickChangeInfoBtn();
    await infoUserPage.editInfoUser();
  });
});
