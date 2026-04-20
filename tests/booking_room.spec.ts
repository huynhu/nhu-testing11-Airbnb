import test, { expect } from "playwright/test";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/logInModal";
import { RoomsPage } from "../pages/rooms";
import { RoomDetailsPage } from "../pages/roomDetailsPage";

test.describe("Booking a room flow", () => {
  test("TC01: Verify user can book a room successfully", async ({ page }) => {
    // Steps to navigate to a room details page and perform booking
    // 1. Navigate to home page and log in
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    await homePage.openSignIn();

    const logInModal = new LoginPage(page);
    await logInModal.login("user@example.com", "password");
    // 2. Search for a destination and select a room
    await homePage.selectDestination("Hồ Chí Minh");
    await homePage.selectDateRange("01/05/2026", "10/05/2026");
    await homePage.selectGuests(2);
    await homePage.clickSearchBtn();

    // 3. On the room details page, select check-in/check-out dates and number of guests
    const roomPage = new RoomsPage(page);
    await expect(roomPage.page).toHaveURL("/rooms/ho-chi-minh");
    await // 4. Click the "Đặt phòng" button
    await roomPage.selectRoom("Phòng Deluxe");
    await expect(page).toHaveURL(/\/room-detail\/.+/);
    // Verify payment
    const roomDetail = new RoomDetailsPage(page);
    await expect(roomDetail.payPerNight).toBeVisible();
    await expect(roomDetail.totalPrice).toBeVisible();
    await expect(roomDetail.totalBeforeTaxes).toBeVisible();
    await expect(roomDetail.cleaningFee).toBeVisible();
    await roomDetail.bookingBtn.click();

    // 5. Verify the confirmation pop-up appears with correct details
    await expect(roomDetail.confirmationPopup).toBeVisible();
    await expect(roomDetail.dateRange).toBeVisible();
    await expect(
      roomDetail.dateRange.locator("text=Ngày sử dụng: 15 - 20")
    ).toBeVisible();
    await expect(
      roomDetail.guestsInfo.locator("text=Lượng khách: 2")
    ).toBeVisible();

    // 6. Click the confirm button on the pop-up
    await roomDetail.confirmBtn.click();

    // 7. Verify a success toast message appears after booking
    await expect(roomDetail.toastMessage).toBeVisible();
  });
});
