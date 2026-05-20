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

  readonly changeInfoEmail: Locator;

  readonly emailField: Locator;
  readonly nameField: Locator;
  readonly phoneField: Locator;
  readonly dobField: Locator;
  readonly genderField: Locator;

  readonly changeInfoBtn: Locator;
  readonly bookedRoomList: Locator;
  readonly toastAvatarMessage: Locator;
  readonly toastInfoMessage: Locator;
  readonly updateBtn: Locator;
  readonly infoUser: (name: string) => Locator;

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
    this.changeInfoEmail = page.locator(".email");
    this.changeAvatarBtn = page.getByRole("button", {
      name: "Cập nhật ảnh",
    });
    this.fileInput = page.locator("input[type='file']");
    this.emailField = page.getByPlaceholder("vidu@gmail.com");
    this.nameField = page.locator("#name");
    this.phoneField = page.locator("#phone");
    this.dobField = page.locator("#birthday");
    this.genderField = page.locator("#gender");
    this.updateBtn = page.getByRole("button", {
      name: "Cập nhật",
      exact: true,
    });

    this.bookedRoomList = page.getByText("Phòng đã thuê", { exact: true });
    this.toastAvatarMessage = page.getByText("Cập nhật avatar thành công!", {
      exact: true,
    });
    this.toastInfoMessage = page.getByText("Cập nhật thông tin thành công!", {
      exact: true,
    });
    this.infoUser = (name: string) =>
      page.getByText(`Xin chào, tôi là ${name}`);
  }

  async clickChangeInfoBtn() {
    await this.changeInfoBtn.click();
    await expect(this.page.getByLabel("Chỉnh sửa hồ sơ")).toBeVisible();
  }

  async clickChangeAvatarBtn() {
    await this.changeAvatarBtn.click();
    await expect(this.page.getByText("Thay đổi ảnh đại diện")).toBeVisible();
  }
  async updateEmail(email: string) {
    await this.emailField.fill(email);
  }
  async updateFullName(name: string) {
    await this.nameField.fill(name);
  }
  async updatePhone(phone: string) {
    await this.phoneField.fill(phone);
  }
  async updateDOB(date?: string) {
    if (date) {
      await this.dobField.fill(date);
    } else {
      await this.page
        .getByRole("button", { name: "close-circle" })
        .nth(3)
        .click();
    }
  }
  async updateGender(gender?: string) {
    if (gender) {
      await this.genderField.fill(gender);
    } else {
      await this.page.locator("/span[@class='ant-select-clear']").click();
    }
  }
  async clickUpdateBtn() {
    await this.updateBtn.click();
  }

  async uploadAvatar(): Promise<void> {
    const filePath = join(__dirname, "..", "data", "test_avatar.jpeg");
    await this.fileInput.setInputFiles(filePath);
    await this.uploadAvatarBtn.click();
    await expect(this.toastAvatarMessage).toBeVisible();
  }

  async validateBookedRoomList(): Promise<void> {
    const count = await this.bookedRoomList.count();
    await expect(count).toBeGreaterThan(0);
  }
  async validateInfoUser(name: string) {
    // await expect(this.toastInfoMessage).toBeVisible();
    await expect(this.infoUser(name)).toBeVisible();
  }
}
