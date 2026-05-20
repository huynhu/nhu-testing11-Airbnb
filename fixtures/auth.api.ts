import { test as base, expect } from "@playwright/test";
import { signInRequest } from "../api/user.api";

type UserCredential = {
  email: string;
  password: string;
};

type Fixtures = {
  loginByAPI: (user: UserCredential) => Promise<void>;
};

export const test = base.extend<Fixtures>({
  loginByAPI: async ({ page }, use) => {
    await use(async (user: UserCredential) => {
      const res = await signInRequest(user);
      const body = await res.json();
      const token = body.content.token;
      const userObject = body.content.user;

      await page.goto("/");

      await page.evaluate(
        ({ token, userObject }) => {
          localStorage.setItem(
            "user",
            JSON.stringify({ ...userObject, token })
          );
        },
        { token, userObject }
      );

      await page.reload();
    });
  },
});

export { expect };
