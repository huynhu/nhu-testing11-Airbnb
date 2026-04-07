import test, { expect } from "playwright/test";
import { HomePage } from "../pages/homePage";

test.describe("Homepage", () => {
  test("Click Hồ Chí Minh card", async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigateToHomePage();
    await homePage.clickCityCard("ho-chi-minh");
    await expect(page).toHaveURL(/.*\/rooms\/ho-chi-minh/);
  });
});

test.describe("Sign Out", () => {
  test("TC01: Đăng xuất thành công", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    await homePage.clickUserDropDown();
    await homePage.clickSignOut();
    await expect(page).toHaveURL("/");
  });
});
