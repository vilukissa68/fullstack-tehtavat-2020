import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INITIAL_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const response = await blogService.create(blog)
    dispatch({
      type: 'ADD_BLOG',
      data: response
    })
  }
}

export const addVote = (blog) => {
  return async dispatch => {
    const upvotedBlog = {
      author: blog.author,
      id: blog.id,
      likes: blog.likes + 1,
      title: blog.title,
      url: blog.url
    }
    const response = await blogService.update(blog.id, upvotedBlog)
    dispatch({
      type: 'LIKE_BLOG',
      data: response
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: id
    })
  }
}


const reducer = (state = [], action) => {
  let id
  switch(action.type){
    case 'INITIAL_BLOGS':
      return action.data
    case 'ADD_BLOG':
      return state.concat(action.data)
    case 'LIKE_BLOG':
      id = action.data.id
      return state.map(blog => blog.id !== id ? blog : action.data)
    case 'REMOVE_BLOG':
      id = action.data
      return state.filter(blog => blog.id !== id)
    default:
      return state
  }
}

export default reducer