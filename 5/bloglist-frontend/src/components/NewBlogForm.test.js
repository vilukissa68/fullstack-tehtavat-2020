import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

describe('<NewBlogForm/>', () => {

  let component
  const createNewBlog = jest.fn()
  const blog = {
    title: 'test blog',
    author: 'tester',
    url: 'www.testurl.test'
  }

  beforeEach(() => {

    component = render(
      <NewBlogForm createBlog={createNewBlog} />
    )

  })

  test('NewBlogForm calls prop function with correct data', () => {
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, { target: { value: blog.title } })
    fireEvent.change(author, { target: { value: blog.author } })
    fireEvent.change(url, { target: { value: blog.url } })
    fireEvent.submit(form)

    expect(createNewBlog.mock.calls).toHaveLength(1)
    expect(createNewBlog.mock.calls[0][0]).toStrictEqual(blog)
  })
})