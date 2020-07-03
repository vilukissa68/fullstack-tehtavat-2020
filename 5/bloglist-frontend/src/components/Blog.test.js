import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog/>', () => {

  let component
  const mockHandler = jest.fn()

  beforeEach(() => {

    const user = {
      username: 'root',
      name: 'root'
    }

    const blog = {
      user: user,
      title: 'test blog',
      author: 'tester',
      likes: 7,
      url: 'www.testurl.test'
    }

    component = render(
      <Blog blog={blog} user={user} likeBlog={mockHandler}/>
    )
  })

  test('initially blog only shows title and author', () => {

    const div = component.container.querySelector('.blog')

    expect(div).toHaveTextContent('test blog')
    expect(div).toHaveTextContent('tester')
    expect(div).not.toHaveTextContent('7')
    expect(div).not.toHaveTextContent('www.testurl.test')
  })

  test('after clicking show button likes and url are visible', () => {

    const div = component.container.querySelector('.blog')
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(div).toHaveTextContent('test blog')
    expect(div).toHaveTextContent('tester')
    expect(div).toHaveTextContent('7')
    expect(div).toHaveTextContent('www.testurl.test')
  })

  test('if like button is presser multiple times all of them register', () => {

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    expect(mockHandler.mock.calls).toHaveLength(0)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(1)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})