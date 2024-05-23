import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [notification, setNotification] = useState({message: null, type: ''})
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification({
        message: `wrong username or password`,
        type: 'error'
      })
      setTimeout(() => {
        setNotification({
          message: null
        })
      }, 5000)
    }
  }

  const handleChangeUsername = (target) => setUsername(target.value)
  const handleChangePassword= (target) => setPassword(target.value)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      const response = await blogService.create({
        author: newBlogAuthor,
        title: newBlogTitle,
        url: newBlogUrl
      })
      const newBlogs = [...blogs]
      newBlogs.push(response)
      setBlogs(newBlogs)
      setNotification({
        message: `A new blog ${newBlogTitle} by ${newBlogAuthor} added`,
        type: 'success'
      })
      setTimeout(() => {
        setNotification({
          message: null
        })
      }, 5000)
      setNewBlogAuthor('')
      setNewBlogTitle('')
      setNewBlogUrl('')
      setVisible(false)
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleChangeBlogTitle = (target) => setNewBlogTitle(target.value)
  const handleChangeBlogAuthor = (target) => setNewBlogAuthor(target.value)
  const handleChangeBlogUrl= (target) => setNewBlogUrl(target.value)

  const blogView = () => (
    <>
      <p>
        {`${user.name} logged in`}<button onClick={handleLogout}>logout</button>
      </p>
      <Togglable
        buttonLabel={'create new blog'}
        visible={visible}
        setVisible={(newState) => setVisible(newState)}
      >
        <BlogForm
          title={newBlogTitle}
          author={newBlogAuthor}
          url={newBlogUrl}
          handleCreateBlog={handleCreateBlog}
          handleChangeBlogTitle={handleChangeBlogTitle}
          handleChangeBlogAuthor={handleChangeBlogAuthor}
          handleChangeBlogUrl={handleChangeBlogUrl}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </> 
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification.message} type={notification.type}/>
      {
        user === null ?
          <LoginForm 
            username={username}
            password={password}
            handleLogin={handleLogin}
            handleChangeUsername={handleChangeUsername}
            handleChangePassword={handleChangePassword}  
          />
        :
          blogView()
          
      }
    </div>
  )
}

export default App