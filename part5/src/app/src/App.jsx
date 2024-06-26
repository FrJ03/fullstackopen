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
  const [notification, setNotification] = useState({ message: null, type: '' })
  const [visible, setVisible] = useState(false)

  const sortBlogs = (blogList) =>  blogList.sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( sortBlogs(blogs) )
    })
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
        message: 'wrong username or password',
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

  const handleCreateBlog = async (event,blog) => {
    event.preventDefault()
    try {
      const response = await blogService.create(blog)
      const newBlogs = [...blogs]
      newBlogs.push(response)
      setBlogs(newBlogs)
      setNotification({
        message: `A new blog ${blog.title} by ${blog.author} added`,
        type: 'success'
      })
      setTimeout(() => {
        setNotification({
          message: null
        })
      }, 5000)
      setVisible(false)
    } catch (exception) {
      console.log(exception)
    }
  }

  const addLikes = (event, blog) => {
    event.preventDefault()
    blogService.update(blog)
    setBlogs( sortBlogs(blogs) )
  }

  const deleteBlog = async (event, blog) => {
    event.preventDefault()
    const status = await blogService.deleteBlog(blog)
    if(status === 200){
      let newBlogs = [...blogs]
      newBlogs = newBlogs.filter(b => String(blog.id) !== String(b.id))
      setBlogs(newBlogs)
    }
  }

  const blogView = () => (
    <>
      <p>
        {`${user.name} logged in`}<button data-testid='logoutButton' onClick={handleLogout}>logout</button>
      </p>
      <Togglable
        buttonLabel={'create new blog'}
        visible={visible}
        setVisible={(newState) => setVisible(newState)}
      >
        <BlogForm
          handleCreateBlog={handleCreateBlog}
        />
      </Togglable>
      {blogs.map((blog) =>
        <Blog key={blog.id} blog={blog} addLikes={addLikes} deleteBlog={deleteBlog} username={user.username}/>
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