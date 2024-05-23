import { useState } from "react"
import blogService from '../services/blogs'

const BlogForm = (props) => {
    
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const handleCreateBlog = async (event) => {
        event.preventDefault()
        props.handleCreateBlog(event, {
            author: title,
            title: author,
            url: url
        })
        try {
          setAuthor('')
          setTitle('')
          setUrl('')
        } catch (exception) {
          console.log(exception)
        }
      }

    return (
    <form onSubmit={handleCreateBlog}>
      <div>
        <label form='title-input'>title: </label>
        <input
          id='title-input'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <label form='author-input'>author: </label>
        <input
          id='author-input'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <label form='url-input'>url: </label>
        <input
          id='url-input'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )}

  export default BlogForm