import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [statusMessage, setStatusMessage] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const response = await blogService.getAll()
      setBlogs( response )
    }
    fetchData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    defineMessage({ message: 'logged out', isSuccess: true })
  }

  const handleLogin = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject)
      if (user) {
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
        )
        blogService.setToken(user.token)
        setUser(user)
        defineMessage({ message: 'login successful!', isSuccess: true })
      }
    } catch (exception) {
      defineMessage({ message: 'wrong username or password', isSuccess: false })
    }
  }
  
  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      if (newBlog) {
        setBlogs(blogs.concat(newBlog))
        defineMessage({ message: `blog "${newBlog.title}" (by ${newBlog.author}) created successfully!`, isSuccess: true })
      }
    } catch (exception) {
      defineMessage({ message: `error creating blog: ${exception.message}`, isSuccess: false })
    }
  }

  const defineMessage = ({ message, isSuccess }) => {
    //reset
    setMessage(null)
    setStatusMessage(null)
    //success
    if (isSuccess) {
      setStatusMessage('success')
      setMessage(message)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      return
    }
    //error
    setStatusMessage('error')
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    return
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm handleLogin={handleLogin}></LoginForm>
      </Togglable>
    )
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel='new blog'>
        <BlogForm createBlog={addBlog}></BlogForm>
      </Togglable>
    )
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification status={statusMessage} message={message}></Notification>

      {!user && loginForm()}
      {user && 
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>  
          </p>
          {blogForm()}
        </div>
      } 

      <br /> 
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>  
  )
}

export default App