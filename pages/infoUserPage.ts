import { expect, type Locator, type Page } from "playwright/test";

export class InfoUserPage {
  readonly page: Page;

  readonly changeAvatarBtn: Locator;
  readonly uploadAvatarBtn: Locator;

  readonly changeInfoBtn: Locator;

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
  }

  async clickChangeInfoBtn() {
    await this.changeInfoBtn.click();
    await expect(this.page.getByText("Chỉnh sửa hồ sơ")).toBeVisible();
  }

  async clickChangeAvatarBtn() {
    await this.changeAvatarBtn.click();
    await expect(this.page.getByText("Thay đổi ảnh đại diện")).toBeVisible();
  }

  async editInfoUser(
    email?: string,
    fullName?: string,
    phone?: string,
    DOB?: string,
    gender?: string
  ): Promise<void> {
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
    const filePath = "tests/fixtures/avatar.jpg";
    await this.uploadAvatarBtn.setInputFiles(filePath);
    await expect(
      this.page.getByText("Ảnh đại diện đã được cập nhật")
    ).toBeVisible();
  }
}
