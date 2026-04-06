export class InfoUserPage {
  readonly page: Page;

  readonly userName: Locator;
  readonly userEmail: Locator;
  readonly userPhone: Locator;
  readonly userBirthday: Locator;
  readonly userGender: Locator;
  readonly changeAvatarBtn: Locator;
  readonly changeInfoBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userName = page.getByTestId("user-name");
    this.userEmail = page.getByTestId("user-email");
    this.userPhone = page.getByTestId("user-phone");
    this.userBirthday = page.getByTestId("user-birthday");
    this.userGender = page.getByTestId("user-gender");
    this.changeAvatarBtn = page.getByRole("button", {
      name: "Cập nhật ảnh",
    });
    this.changeInfoBtn = page.getByRole("button", {
      name: "Chỉnh sửa hồ sơ",
    });
  }
}
