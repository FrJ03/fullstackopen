import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../src/components/Blog'

test('Renders blog title and blog author', () => {
  const blog = {
    title: 'title',
    author: 'author',
    id: 'id',
    likes: 1,
    url: 'url',
    user: {
      id: 'id',
      username: 'username',
      name: 'name'
    }
  }
  const deleteBlog = () => 1
  const sortBlogs = () => 1

  const { container } = render(<Blog blog={blog} deleteBlog={deleteBlog} sortBlogs={sortBlogs}/>)

  expect(container).toHaveTextContent('title')
  expect(container).toHaveTextContent('author')
})

test('Renders blog url and likes author', async () => {
  const blog = {
    title: 'title',
    author: 'author',
    id: 'id',
    likes: 1,
    url: 'url',
    user: {
      id: 'id',
      username: 'username',
      name: 'name'
    }
  }
  const deleteBlog = () => 1
  const sortBlogs = () => 1

  const { container } = render(<Blog blog={blog} deleteBlog={deleteBlog} sortBlogs={sortBlogs}/>)

  const user = userEvent.setup()
  const button = screen.getByText('show')
  await user.click(button)

  expect(container).toHaveTextContent('url')
  expect(container).toHaveTextContent('1')
})