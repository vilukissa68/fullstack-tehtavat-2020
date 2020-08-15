
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import Recomendations from './components/Recomendations'
import { useApolloClient, useSubscription } from '@apollo/client'
import { BOOK_ADDED, ALL_BOOKS } from './queries'


const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log("Subscription")
      console.log(subscriptionData)
      window.alert(`New book added: ${subscriptionData.data.bookAdded.title}`)
      updateCacheWith(subscriptionData.data.bookAdded)
    }
  })

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => {
      set.map(b => b.id).includes(object.id)
    }

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if(!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook)}
      })
    }
  }

  useEffect(() => {
    const userToken = localStorage.getItem('library-user-token')
    console.log(userToken)
    if(userToken) {
      setToken(userToken)
    }
  }, [])

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleLogOut = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token){
    return (
      <div>
        <Notify errorMessage={errorMessage}/>
        <h2>Login</h2>
        <LoginForm
        setToken={setToken}
        setError={notify}
        />
      </div>
    )
  }
  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommended')}>recommended</button>
        <button onClick={handleLogOut}>logout</button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      />

      <Recomendations
        show={page === 'recommended'}
      />

    </div>
  )
}

export default App