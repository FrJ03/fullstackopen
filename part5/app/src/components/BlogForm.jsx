const BlogForm = (props) => (
    <form onSubmit={async (event) => props.handleCreateBlog(event)}>
      <div>
        <label form='title-input'>title: </label>
        <input
          id='title-input'
          value={props.newBlogTitle}
          onChange={({ target }) => props.handleChangeBlogTitle(target)}
        />
      </div>
      <div>
        <label form='author-input'>author: </label>
        <input
          id='author-input'
          value={props.newBlogAuthor}
          onChange={({ target }) => props.handleChangeBlogAuthor(target)}
        />
      </div>
      <div>
        <label form='url-input'>url: </label>
        <input
          id='url-input'
          value={props.newBlogUrl}
          onChange={({ target }) => props.handleChangeBlogUrl(target)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )

  export default BlogForm