import { render, screen } from '@testing-library/react'
import Blog from '../src/components/Blog'

test('Renders blog title and blog author', () => {
  const blog = {
    title: 'title',
    author: 'author',
    id: 'id',
    likes: 1,
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