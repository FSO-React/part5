import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const blogStyle = {
    padding: 8,
    border: 'solid',
    borderWidth: 1,
    margin: 4
  }

  const buttonStyle = {
    margin: 4
  }

  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const likeBlog = (event) => {
    event.preventDefault()
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    updateBlog(updatedBlog)
  }

  return (
    <div style={blogStyle}>
      "{blog.title}"
      <button onClick={toggleDetails} style={buttonStyle}> view </button>
      <div>
        {showDetails &&
          <div>
            <div> 
              <strong>url:</strong> <a href={blog.url}> {blog.url} </a>
            </div>  
            <div> 
              <strong>likes:</strong> {blog.likes}
              <button onClick={likeBlog} style={buttonStyle}> like </button>
            </div>  
            <div> 
              <strong>author:</strong> {blog.author}
            </div>  
          </div> 
        }

      </div>
    </div>  
  )
}

export default Blog