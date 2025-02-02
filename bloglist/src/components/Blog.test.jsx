import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Adrian Diaz',
    url: 'https://example.com',
    likes: 10
  }

  const updateBlog = vi.fn()
  const removeBlog = vi.fn()

  const { container } = render(<Blog blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />)
  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent(`Component testing is done with react-testing-library - Adrian Diaz`)
  expect(div).not.toHaveTextContent(`url: https://example.com`)
  expect(div).not.toHaveTextContent(`likes: 10`)
})