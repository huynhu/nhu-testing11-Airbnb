import test, { expect } from "playwright/test";

test.describe("Homepage", () => {
  test("Verify Home Page after Login", async ({ page }) => {
    await page.goto("/");
    await page.fill("#username", "testuser");
    await page.fill("#password", "password");
    await page.click("#login-button");
    const title = await page.title();
    expect(title).toBe("Home - Example");
  });
});
