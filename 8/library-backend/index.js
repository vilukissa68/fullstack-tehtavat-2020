const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
require('dotenv').config()
const Book = require('./models/book')
const Author = require('./models/author')


mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

let MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to mongoDB')
  })
  .catch((error) => {
    console.log('error connecting to mongoDB', error.message)
  })


const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author
    id: ID!
    genres: [String]
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      authorName: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: async (root, args) => {
      let filteredBooks = await Book.find({}).populate('author')
      if(args.author){
        filteredBooks = filteredBooks.filter(book => book.author.name === args.author)
      }
      if(args.genre){
        filteredBooks = filteredBooks.filter(book => book.genres.includes(args.genre))
      }
      console.log("books", filteredBooks)
      return filteredBooks
    },
    allAuthors: () => {
      return Author.find({})
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      console.log("Args:", args)
      let foundAuthor = await Author.findOne({ name: args.authorName })
      if(!foundAuthor){
        const author = new Author({
          name: args.authorName
        })
        try{
          foundAuthor = await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
        const book = new Book({
          title: args.title,
          published: args.published,
          genres: args.genres,
          author: foundAuthor._id
        })
        
        try {
          await book.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        const corresponding = await Book.findById(book._id).populate('Author', { name: 1, id: 1})
        book.Author = {name: args.authorName}
        console.log("Author:", foundAuthor)
        console.log("Book:", book)
        console.log("Corresponding;", corresponding)
        return book
    },
    editAuthor: async (root, args) => {
      console.log("args:", args)
      console.log("editing author")
      const it = await Author.findOne({name: args.name})
      console.log("Found author", it)
 
      if(it){
        let editedAuthor = {...it}
        if(args.setBornTo){
          editedAuthor = {
            name: args.name,
            born: args.setBornTo,
          }
        }
        console.log("Updating author information")
        const response =  await Author.findByIdAndUpdate(it._id, editedAuthor)
        return response
      }
    }
  },
  Author: {
    name: (root) => root.name,
    id: (root) => root.id,
    born: (root) => root.born,
    bookCount: async (root) => {
      const books = await Book.find( { "author": { "$in": [root._id]} })
      if(!books){
        return
      }
      return books.length
    }
  },
  Book: {
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})