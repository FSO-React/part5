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
    expect(page.getByText('Log in to application')).not.toBeNull()
    expect(page.getByText('Log in to application')).toBeVisible()
  })

})