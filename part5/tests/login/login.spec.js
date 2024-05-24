const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const usernameLabel = await page.getByText('username')
    const passwordLabel = await page.getByText('password')

    await expect(usernameLabel).toBeVisible()
    await expect(passwordLabel).toBeVisible()
  })
})