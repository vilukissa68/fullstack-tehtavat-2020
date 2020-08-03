import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

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
      <Form onSubmit={handleNewBlog}>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control type="text"
            id='title'
            value={newTitle}
            name='Title'
            onChange={({ target }) => setNewTitle(target.value)}/>
          <Form.Label>author</Form.Label>
          <Form.Control type="text"
            id='author'
            value={newAuthor}
            name='Author'
            onChange={({ target }) => setNewAuthor(target.value)}/>
          <Form.Label>url</Form.Label>
          <Form.Control type="text"
            id='url'
            value={newUrl}
            name='Url'
            onChange={({ target }) => setNewUrl(target.value)}/>
        </Form.Group>
        <Button variant="primary" id="submitBlogButton" type="submit">add</Button>
      </Form>
    </div>
  )
}

NewBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default NewBlogForm
