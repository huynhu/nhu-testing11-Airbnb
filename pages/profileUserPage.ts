import { join } from "path";
import { expect, type Locator, type Page } from "playwright/test";

type EditUserPayload = {
  email?: string;
  fullName?: string;
  phone?: string;
  DOB?: string;
  gender?: string;
};

export class InfoUserPage {
  readonly page: Page;

  readonly changeAvatarBtn: Locator;
  readonly fileInput: Locator;
  readonly uploadAvatarBtn: Locator;

  readonly changeInfoBtn: Locator;
  readonly bookedRoomList: Locator;
  readonly toastMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.changeAvatarBtn = page.getByRole("button", {
      name: "Cập nhật ảnh",
    });
    this.uploadAvatarBtn = page.getByRole("button", {
      name: "Upload Avatar",
    });
    this.changeInfoBtn = page.getByRole("button", {
      name: "Chỉnh sửa hồ sơ",
    });
    this.changeAvatarBtn = page.getByRole("button", {
      name: "Cập nhật ảnh",
    });
    this.fileInput = page.locator("input[type='file']");

    this.bookedRoomList = page.getByText("Phòng đã thuê", { exact: true });
    this.toastMessage = page.getByText("Cập nhật avatar thành công!", {
      exact: true,
    });
  }

  async clickChangeInfoBtn() {
    await this.changeInfoBtn.click();
    await expect(this.page.getByText("Chỉnh sửa hồ sơ")).toBeVisible();
  }

  async clickChangeAvatarBtn() {
    await this.changeAvatarBtn.click();
    await expect(this.page.getByText("Thay đổi ảnh đại diện")).toBeVisible();
  }

  async editInfoUser(data: EditUserPayload): Promise<void> {
    const { email, fullName, phone, DOB, gender } = data;

    if (email) {
      await this.page.getByLabel("Email").fill(email);
    }
    if (fullName) {
      await this.page.getByLabel("Họ tên").fill(fullName);
    }
    if (phone) {
      await this.page.getByLabel("Số điện thoại").fill(phone);
    }
    if (DOB) {
      await this.page.getByLabel("Ngày sinh").fill(DOB);
    }
    if (gender) {
      await this.page.getByLabel("Giới tính").selectOption(gender);
    }

    await this.page
      .getByRole("button", { name: "Cập nhật", exact: true })
      .click();

    await expect(
      this.page.getByText("Cập nhật thông tin thành công")
    ).toBeVisible();
  }

  async uploadAvatar(): Promise<void> {
    const filePath = join(__dirname, "..", "tests", "data", "test_avatar.jpeg");
    await this.fileInput.setInputFiles(filePath);
    await this.uploadAvatarBtn.click();
    await expect(this.toastMessage).toBeVisible();
  }

  async validateBookedRoomList(): Promise<void> {
    const count = await this.bookedRoomList.count();
    await expect(count).toBeGreaterThan(0);
  }
}
