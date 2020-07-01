import React, {useState} from 'react'

const NewBlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    createBlog(newBlog)
  }

  return (
  <div>
    <h2>new note</h2>
    <form onSubmit={handleNewBlog}>
      <div>
        title
          <input type="text"
          value={newTitle}
          name='Title'
          onChange={({ target }) => setNewTitle(target.value)}/>
      </div>
       <div>
        author
          <input type="text"
          value={newAuthor}
          name='Author'
          onChange={({ target }) => setNewAuthor(target.value)}/>
      </div>
       <div>
        url
          <input type="text"
          value={newUrl}
          name='Url'
          onChange={({ target }) => setNewUrl(target.value)}/>
      </div>
      <button type="submit">add</button>
    </form>
  </div>
  )
}

export default NewBlogForm
