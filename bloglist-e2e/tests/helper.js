const loginWith = async (page, username, password)  => {
  await page.getByRole('button', { name: 'login' }).click()
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const logOut = async (page) => {
  await page.getByRole('button', { name: 'logout' }).click()
}

const createBlog = async (page, blog) => {
  await page.getByRole('button', { name: 'create new blog' }).click()
  await page.getByTestId('title-input').fill(blog.title)
  await page.getByTestId('author-input').fill(blog.author)
  await page.getByTestId('url-input').fill(blog.url)
  await page.getByRole('button', { name: 'create' }).click()
  await page.getByRole('button', { name: 'cancel' }).click()
  await page.getByText(`${blog.title} - ${blog.author}`).waitFor()
}

const likeBlog = async (page, blog, times) => {
  const blogDiv = await page.getByText(`${blog.title} - ${blog.author}`)
  await blogDiv.getByRole('button', { name: 'view' }).click()
  for (let i = 0; i < times; i++) {
    await blogDiv.getByRole('button', { name: 'like' }).click()
  }
}

export { loginWith, logOut, createBlog, likeBlog }