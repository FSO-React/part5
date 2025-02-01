import { useState } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div style={blogStyle}>
      "{blog.title}"
      <button onClick={toggleDetails}>view</button>
      <div>
        {showDetails &&
          <div>
            <div> 
              <strong>url:</strong> <a href={blog.url}> {blog.url} </a>
            </div>  
            <div> 
              <strong>likes:</strong> {blog.likes}
              <button>like</button>
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