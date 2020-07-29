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

const reducer = (state = [], action) => {
  switch(action.type){
    case "INITIAL_BLOGS":
      return action.data
    default:
      return state
  }
}

export default reducer