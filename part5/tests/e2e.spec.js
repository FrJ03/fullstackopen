const { test, expect, beforeEach, describe } = require('@playwright/test')
const { afterEach, before } = require('node:test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'test',
        username: 'test',
        password: 'test'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const usernameLabel = await page.getByText('username')
    const passwordLabel = await page.getByText('password')

    await expect(usernameLabel).toBeVisible()
    await expect(passwordLabel).toBeVisible()
  })
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('test')
      await page.getByTestId('password').fill('test')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('test logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('test')
      await page.getByTestId('password').fill('test1')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('username')).toBeVisible()
      await expect(page.getByText('password')).toBeVisible()
    })
  })
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('test')
      await page.getByTestId('password').fill('test')
      await page.getByRole('button', { name: 'login' }).click()
    })
  
    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByTestId('title').fill('title')
      await page.getByTestId('author').fill('author')
      await page.getByTestId('url').fill('url')
      await page.getByRole('button', { name: 'create' }).click()

      await expect(page.getByText('title')).toBeVisible()
      await expect(page.getByText('author')).toBeVisible()
    })
    test('a blog can be liked', async ({ page }) => {
      //await expect(page.getByText('test logged in')).toBeVisible()
      //await expect(page.getByText('title')).toBeVisible()
    
      //console.log(page.getByText('title'))

      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByTestId('title').fill('title')
      await page.getByTestId('author').fill('author')
      await page.getByTestId('url').fill('url')
      await page.getByRole('button', { name: 'create' }).click()
      
      await page.getByTestId('showButton').click()
      await page.getByTestId('likeButton').click()
      

      await expect(page.getByText('1')).toBeVisible()
    })
  })
})