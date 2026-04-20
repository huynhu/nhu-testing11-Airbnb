import { expect, type Locator, type Page } from "@playwright/test";

export class AdminDestinationPage {
  readonly page: Page;

  readonly addDestination: Locator;
  readonly addDestinationModal: Locator;
  readonly searchInput: Locator;

  readonly editDestination: Locator;
  //Locators for delete action in Destination table
  readonly deleteDestination: Locator;
  readonly deleteDestinationModal: Locator;
  readonly confirmDeleteBtn: Locator;
  readonly cancelDeleteBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.searchInput = this.page.getByPlaceholder("Nhập từ khóa tìm kiếm...");

    this.addDestination = this.page.getByRole("button", {
      name: "+ Thêm vị trí mới",
    });
    this.addDestinationModal = this.page.getByText("Thêm vị trí mới");
    this.editDestination = this.page.getByLabel("Actions");

    this.deleteDestination = this.page.getByLabel("Delete");
    this.deleteDestinationModal = this.page.getByText("Xác nhận xoá Vị trí");
    this.confirmDeleteBtn = this.deleteDestinationModal.getByRole("button", {
      name: "Xoá",
    });
    this.cancelDeleteBtn = this.deleteDestinationModal.getByRole("button", {
      name: "Hủy",
    });
  }

  async clickAddDestination() {
    await this.addDestination.click();
    await expect(this.addDestinationModal).toBeVisible();
  }
  async clickEditDestination() {
    await this.editDestination.click();
    await expect(this.page.getByText("Chỉnh sửa vị trí")).toBeVisible();
  }

  async clickDeleteDestination() {
    await this.deleteDestination.click();
    await expect(this.page.getByText("Xác nhận xoá Vị trí")).toBeVisible();
  }
  async searchDestination(keyword: string) {
    await this.searchInput.fill(keyword);
    // Assuming there's a search button to click after filling the input
    // If the search is triggered by pressing Enter, you can use:
  }
}
