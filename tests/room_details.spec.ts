import test, { expect } from "playwright/test";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/logInModal";
import { RoomDetailsPage } from "../pages/roomDetailsPage";
import { RoomsPage } from "../pages/rooms";

test.describe("Room Details Page", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a specific room detail page (replace with actual URL)
    const homePage = new HomePage(page);
    const logInPage = new LoginPage(page);
    await homePage.navigateToHomePage();
    await homePage.openSignIn();
    await logInPage.login("henry@yopmail.com", "Demo@123");
  });
  test("TC01: Verify room details page loads correctly", async ({ page }) => {
    const homePage = new HomePage(page);
    const startDate = "10/05/2026";
    const endDate = "15/05/2026";
    await homePage.clickCityCard("da-nang", "Đà Nẵng");

    const roomsPage = new RoomsPage(page);
    await roomsPage.clickCardToOpenRoomDetails();
    // Navigate to a specific room detail page (replace with actual URL)
    const roomDetailsPage = new RoomDetailsPage(page);

    // const price = await roomDetailsPage.getPricePerNight();
    const totalPrice = await roomDetailsPage.calculateTotalPrice(
      startDate,
      endDate
    );
    await roomDetailsPage.validatePayment(startDate, endDate);
  });
});
