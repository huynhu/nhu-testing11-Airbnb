import test, { expect } from "playwright/test";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/logInModal";
import { adminAccount } from "../data/account";

test.describe("Destination Test", () => {
  const destinations = [
    { name: "Hà Nội", url: "ha-noi" },
    { name: "Đà Nẵng", url: "da-nang" },
    { name: "Hồ Chí Minh", url: "ho-chi-minh" },
    { name: "Nha Trang", url: "nha-trang" },
    { name: "Cần Thơ", url: "can-tho" },
    { name: "Phú Quốc", url: "phu-quoc" },
    { name: "Đà Lạt", url: "da-lat" },
    { name: "Phan Thiết", url: "phan-thiet" },
  ];
  for (const city of destinations) {
    test(`"Click ${city.name} card"`, async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.navigateToHomePage();
      await homePage.clickCityCard(city.url, city.name);
      await expect(page).toHaveURL(`/rooms/${city.url}`);
    });
  }
});

test.describe("Sign Out", () => {
  test.beforeEach(async ({ page }) => {
    // 1. Mo trang chu
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    await homePage.navigateToHomePage();
    //2. Mo form sign in
    await homePage.openSignIn();
    await loginPage.login(adminAccount.email, adminAccount.password);
  });

  test("TC01: Đăng xuất thành công", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickSignOut();
    await expect(page).toHaveURL("/");
  });

  test("TC02: Search destination", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.selectDestination("Đà Lạt");
    await homePage.selectDateRange("01/05/2026", "10/05/2026");
    await homePage.selectGuests(2);
    await homePage.clickSearchBtn();
  });
});
