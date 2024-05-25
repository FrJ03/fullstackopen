import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLikes, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  const addLike = (event) => {
    event.preventDefault()
    blog.likes += 1
    setLikes(blog.likes)
    addLikes(event, blog)
  }

  const removeBlog = async (event) => {
    event.preventDefault()
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      deleteBlog(event, blog)
    }
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button data-testid='showButton' onClick={toggleVisibility}>show</button>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          {`likes ${likes}`} <button data-testid='likeButton' onClick={addLike}>like</button>
        </div>
        <div>
          {
            Object.hasOwn(blog, 'user') ?
              blog.user.username :
              'Unknown'
          }
        </div>
        <div>
          <button onClick={removeBlog}>Remove</button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  addLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
}

export default Blog