import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = (props) => {

  const bookResult = useQuery(ALL_BOOKS)
  const userResult = useQuery(ME)

  
  if(!props.show){
    return null
  }

  if (bookResult.loading || userResult.loading){
    return <div>loading...</div>
  }
  const user = userResult.data.me
  console.log("User:",user)
  const books = bookResult.data.allBooks.filter(book => book.genres.includes(user.favoriteGenre))
  console.log("Books", books)

  return (
    <>
      <h1>recommendations</h1>
      <div>books in your favorite genre <b>{user.favoriteGenre}</b></div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
            <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )

}

export default Recommendations