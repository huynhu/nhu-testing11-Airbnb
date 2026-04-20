import { expect, type Locator, type Page } from "@playwright/test";

export class AdminPage {
  readonly page: Page;

  readonly sidebarMenu: Locator;
  readonly userManagementMenu: Locator;
  readonly locationManagementMenu: Locator;
  readonly roomManagementMenu: Locator;
  readonly bookingManagementMenu: Locator;

  //Search section
  readonly searchInput: Locator;
  readonly addUser: Locator;

  //Actions in User table
  readonly editUser: Locator;
  readonly deleteUser: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebarMenu = this.page.locator('ul[role="menu"]');

    this.userManagementMenu = this.page.getByRole("link", {
      name: "Quản lý người dùng",
    });
    this.locationManagementMenu = this.page.getByRole("link", {
      name: "Quản lý vị trí",
    });
    this.roomManagementMenu = this.page.getByRole("link", {
      name: "Quản lý Room",
    });
    this.bookingManagementMenu = this.page.getByRole("link", {
      name: "Quản lý Booking",
    });

    this.searchInput = this.page.getByPlaceholder("Nhập từ khóa tìm kiếm...");
    this.addUser = this.page.getByRole("button", {
      name: "+ Thêm người dùng",
    });

    this.editUser = this.page.getByLabel("Actions");
    this.deleteUser = this.page.getByLabel("Delete");
  }
  async clickUserManagementMenu() {
    await this.userManagementMenu.click();
  }
  async clickLocationManagementMenu() {
    await this.locationManagementMenu.click();
    await expect(this.page).toHaveURL(/\/admin\/location$/); // URL phải kết thúc bằng /admin/locations
  }
  async clickRoomManagementMenu() {
    await this.roomManagementMenu.click();
    await expect(this.page).toHaveURL(/\/admin\/room$/); // URL phải kết thúc bằng /admin/room
  }
  async clickBookingManagementMenu() {
    await this.bookingManagementMenu.click();
    await expect(this.page).toHaveURL(/\/admin\/booking$/); // URL phải kết thúc bằng /admin/booking
  }
  async searchUser(keyword: string) {
    await this.searchInput.fill(keyword);
    // Assuming there's a search button to click after filling the input
    // If the search is triggered by pressing Enter, you can use:
  }
}
