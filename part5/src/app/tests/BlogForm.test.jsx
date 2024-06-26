import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../src/components/BlogForm'

test('Send blog', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm handleCreateBlog={createBlog}/>)

  const titleInput = screen.getByTestId('title')
  const authorInput = screen.getByTestId('author')
  const urlInput = screen.getByTestId('url')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'title')
  await user.type(authorInput, 'author')
  await user.type(urlInput, 'url')

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][1].title).toBe('title')
  expect(createBlog.mock.calls[0][1].author).toBe('author')
  expect(createBlog.mock.calls[0][1].url).toBe('url')
})