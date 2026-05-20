import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/logInModal";
import { RoomDetailsPage } from "../pages/roomDetailsPage";
import { RoomsPage } from "../pages/rooms";
import { test, expect } from "../fixtures/auth.api";
import { userAccount } from "../data/account";
import { apiUserGenerator } from "../utils/dataGenerator/apiUserGenerator";
import { signUpUser } from "../api/user.api";
import { SignUpPage } from "../pages/signUpPage";

test.describe("Booking Room Flow Test", () => {
  test.beforeEach(async ({ loginByAPI, page }) => {
    const apiuser = apiUserGenerator();
    const homePage = new HomePage(page);
    const signUpPage = new SignUpPage(page);
    const res1 = await signUpUser(apiuser);
    const res1Body = await res1.json();
    await homePage.navigateToHomePage();
    await homePage.openSignUp();
    await signUpPage.signUp(
      apiuser.name,
      apiuser.email,
      apiuser.password,
      apiuser.phone,
      apiuser.birthday,
      apiuser.gender ? "Nam" : "Nữ"
    );
    await loginByAPI({
      email: userAccount.email,
      password: userAccount.password,
    });
  });

  test("TC01 - Room Details: Verify that user can book room for 1 guest successfully", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const startDate = "10/06/2026";
    const endDate = "15/06/2026";

    await homePage.clickCityCard("Đà Nẵng", "da-nang");

    const roomsPage = new RoomsPage(page);
    await roomsPage.clickCardToOpenRoomDetails();
    // Navigate to a specific room detail page

    const roomDetailsPage = new RoomDetailsPage(page);
    await roomDetailsPage.selectCheckInOutDate(startDate, endDate);
    //Validate payment displays correctly
    await roomDetailsPage.validatePayment(startDate, endDate);

    await roomDetailsPage.bookingBtn.click();
    await roomDetailsPage.confirmBtn.click();
    // Validate the room is booked successfully
    await expect(roomDetailsPage.toastMessage).toBeVisible();
  });
  test("TC02 - Room Details: Verify that user can book room for 2 guests successfully", async ({
    page,
  }) => {
    const homePage = new HomePage(page);

    await homePage.clickCityCard("Hà Nội", "ha-noi");

    const roomsPage = new RoomsPage(page);
    await roomsPage.clickCardToOpenRoomDetails();
    // Navigate to a specific room detail page

    const roomDetailsPage = new RoomDetailsPage(page);
    const { checkIn, checkOut } = await roomDetailsPage.getFutureDates(30);
    await roomDetailsPage.selectCheckInOutDate(checkIn, checkOut);
    await roomDetailsPage.selectGuests(2);
    await roomDetailsPage.validateGuest(2);
    //Validate payment displays correctly
    await roomDetailsPage.validatePayment(checkIn, checkOut);

    await roomDetailsPage.bookingBtn.click();
    await roomDetailsPage.confirmBtn.click();
    // Validate the room is booked successfully
    await expect(roomDetailsPage.toastMessage).toBeVisible();
  });
});
test.describe("Need Sign In Before Booking", () => {
  test("TC03 - Room Details: Verify that user is unable to book room when has not signed in yet", async ({
    page,
  }) => {
    const homePage = new HomePage(page);

    await homePage.navigateToHomePage();
    await homePage.clickCityCard("Cần Thơ", "can-tho");

    const roomsPage = new RoomsPage(page);

    await roomsPage.clickCardToOpenRoomDetails();
    // Navigate to a specific room detail page

    const roomDetailsPage = new RoomDetailsPage(page);
    const { checkIn, checkOut } = await roomDetailsPage.getFutureDates(30);
    await roomDetailsPage.selectCheckInOutDate(checkIn, checkOut);
    //Validate payment displays correctly
    await roomDetailsPage.validatePayment(checkIn, checkOut);

    await roomDetailsPage.bookingBtn.click();

    await expect(roomDetailsPage.needSignInToast).toBeVisible();
  });
});
