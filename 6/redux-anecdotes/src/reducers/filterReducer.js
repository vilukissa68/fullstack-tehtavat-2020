const filterStringAtStart = ''


export const setFilterString = (content) => {
  return {
    type: "SET_FILTER_STRING",
    content: content
  }
}

const reducer = (state = filterStringAtStart, action) => {
  
  switch(action.type){
    case "SET_FILTER_STRING":
      return action.content
    default:
      return state
  }
}

export default reducer