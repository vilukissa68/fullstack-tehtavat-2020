import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {

  const [shownGenre, setShownGenre] = useState(null)

  const result = useQuery(ALL_BOOKS)
  
  if (!props.show) {
    return null
  }

  if (result.loading){
    return <div>loading...</div>
  }


  const books = result.data.allBooks

  const BooksTable = ({books}) => {
    return(
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
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
    )}

  const GenreButtons = ({setShownGenre}) => {
    let allGenres = []
    books.forEach(book => {
      book.genres.forEach(genre => {
        allGenres = allGenres.concat(genre)
      })
    })
    const uniqueGenres = allGenres.filter((item, index) => allGenres.indexOf(item) === index)

    return (
      <div>
        <button key={'all-genres-button'}
        onClick={() => setShownGenre(null)}>all genres</button>
        {uniqueGenres.map(genre => 
        <button key={`${genre}-button`}
         value={genre}
         onClick={({ target }) => setShownGenre(target.value)}>{genre}</button>
        )}
        </div>
    )
  }

  if(shownGenre){
    const shownBooks = books.filter(book => book.genres.includes(shownGenre))
    return (
      <>
       <h2>books</h2>
       <GenreButtons setShownGenre={setShownGenre}/>
       <BooksTable books={shownBooks}/>
      </>
    )
  }

  return (
    <div>
      <h2>books</h2>
      <GenreButtons setShownGenre={setShownGenre}/>
      <BooksTable books={books}/>
    </div>
  )
}

export default Books