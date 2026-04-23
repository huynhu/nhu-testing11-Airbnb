import test, { expect } from "playwright/test";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/logInModal";
import { RoomsPage } from "../pages/rooms";

test.describe("Room Page Test", () => {
  test("TC01: Verify user can view list of rooms after filtered by destination", async ({
    page,
  }) => {
    // Steps to navigate to a room details page and perform booking
    // 1. Navigate to home page and log in
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    await homePage.openSignIn();

    const logInModal = new LoginPage(page);
    await logInModal.login("henry@yopmail.com", "Demo@123");
    // 2. Search for a destination and select a room
    const destination = "Hồ Chí Minh";
    const startDate = "01/05/2026";
    const endDate = "10/05/2026";
    await homePage.selectDestination(destination);
    await homePage.selectDateRange(startDate, endDate);
    await homePage.clickSearchBtn();

    // 3. On the room details page, select check-in/check-out dates and number of guests
    const roomPage = new RoomsPage(page);
    await roomPage.validateResult(destination, startDate, endDate);
  });
});
