const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Playwright',
        username: 'playwright',
        password: '1234'
      }
    })
    await page.goto('/')
  })

  test('login form is shown', async ({ page }) => {
    const locator = await page.getByText('blogs')
    expect(locator).not.toBeNull()
    await page.getByRole('button', { name: 'login' }).click()
    expect(page.getByText('Log in to application')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'playwright', '1234')
      await expect(page.getByText('Playwright logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'playwright', 'wrong')
      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')
    })
  })
  
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'playwright', '1234')
    })

    test('a blog can be created', async ({ page }) => {
      const blog = {
        title: 'Playwright blog',
        author: 'Playwright',
        url: 'https://playwright.dev'
      }
      await createBlog(page, blog)
      await expect(page.getByText(`${blog.title} - ${blog.author}`)).toBeVisible()
    })
  })
})