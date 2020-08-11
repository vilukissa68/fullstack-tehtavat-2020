import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
      }
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $authorName: String!, $genres: [String!]!) {
    addBook(title: $title, published: $published, authorName: $authorName, genres: $genres)
    {
      title
      published
      genres
    }
  }
`

export const SET_BIRTH = gql`
  mutation setBirth($name: String!, $born: Int!) {
    editAuthor(
      name: $name, 
      setBornTo: $born
    ) {
        name
        born
    }
  }
`