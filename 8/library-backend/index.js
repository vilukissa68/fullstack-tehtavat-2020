const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const JWT_SECRET = 'SECRET_SECRET'
const pubsub = new PubSub()

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
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Subscription {
    bookAdded: Book!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      authorName: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
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
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if(!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
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
          book.Author = {name: args.authorName}

          pubsub.publish('BOOK_ADDED', { bookAdded: book })

          return book
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if(!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
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
    },
  createUser: (root, args) => {
      const userObject = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
        password: "salasana"
      })
      return userObject.save()
      .catch(error => {
      throw new UserInputError(error.message, {
        invalidArgs: args,
      })
    })
  },
  login: async (root, args) => {
    const user = await User.findOne({ username: args.username})
    if ( !user || args.password !== 'salasana'){
      console.log("wrong creditentials")
      throw new UserInputError("wrong creditentials")
    }

    const userForToken = {
      username: user.username,
      id: user._id
    }

    return { value: jwt.sign(userForToken, JWT_SECRET)}
  }
},
  Subscription : {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
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
  context: async({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }

    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})