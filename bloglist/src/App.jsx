import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blog, setBlog] = useState({ title: '', author: '', url: '' })

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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      alert('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleCreateBlog = async () => {
    try {
      const newBlog = await blogService.create(blog)
      if (newBlog) {
        setBlogs(blogs.concat(newBlog))
        setBlog({ title: '', author: '', url: '' })
      }
    } catch (exception) {
      console.log(exception)
    }
  }

  const loginForm = () => (
    <>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>      
    </>
  )

  const blogCreationForm = () => (
    <form onSubmit={handleCreateBlog}>
      <h1>create new</h1>
      <div>
        title: 
          <input
          type="text"
          value={blog.title}
          name="title"
          onChange={({ target }) => setBlog({ ...blog, title: target.value })}
        />
      </div>
      <div>
        author: 
          <input
          type="text"
          value={blog.author}
          name="author"
          onChange={({ target }) => setBlog({ ...blog, author: target.value })}
        />
      </div>
      <div>
        url: 
          <input
          type="text"
          value={blog.url}
          name="url"
          onChange={({ target }) => setBlog({ ...blog, url: target.value })}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )

  const blogForm = () => (
    <div>
      <h1>blogs</h1>
      <p>
        {user.name} logged-in
        <button onClick={handleLogout}>logout</button>
      </p>
      {blogCreationForm()}
      <br /> 
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>  
  )

  return (
    <div>
      {user === null ?
        loginForm() :
        blogForm()
      }
    </div>
  )
}

export default App