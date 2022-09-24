import { test, expect } from "@playwright/test"

test("invalid-login", async ({ page }) => {
	await page.goto("/")
	await page.click("a[href='/login']")
	await page.type("#email", "_invalid@_")
	await page.type("#password", "invalid")
	await page.click("input[type='submit']")
	expect(await page.evaluate(() => document.querySelector("#error")?.textContent)).toBe(
		"Invalid email or password"
	)
})
