const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {title: "My First Blog", author: "Me", url: "thisfreeblogsitetotallydoesntstealyourinformationandsellit", likes: 0},
  {title: "My Second Blog", author: "Me", url: "thisfreeblogsitetotallydoesntstealyourinformationandsellit", likes : 2},
  {title: "My Third Blog", author: "Me", url: "thisfreeblogsitetotallydoesntstealyourinformationandsellit", likes: 3},
  {title: "My Final Blog I'm quitting", author: "Me", url: "thisfreeblogsitetotallydoesntstealyourinformationandsellit", likes: 2},
  {title: "Existential questions about eating honey as a bear", author: "Winnie",  url: "www.existentialhoney.com", likes: 345},
  {title: "Natural enemies: bears and tigers", author: "Winnie", url: "www.naturalenemies.org", likes: 275},
  {title: "Buying right size t-shirts, preferably red ones", author: "Winnie", url: "www.heretogetshirts.red", likes: 1917},
  {title: "asd", author: "Test", url: "www.com", likes: 404}
]

const blogNotOnServer = {
  title: "Generic Blog Name",
  author: "Generic Author Name",
  url: "www.genericblogaddress.com",
  likes: 7
}

afterAll(() => {
  mongoose.connection.close()
})

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogsObjects = initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogsObjects.map(blog => blog.save())
  
  await Promise.all(promiseArray)

})

describe('api', () => {
  test('notes are returned as json', async () => {
    console.log("testing with", initialBlogs.length, "blogs")
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('id is the indentifing field of blog', async () => {
    const response = await api.get('/api/blogs')
    const blogsOnServer = response.body
    blogsOnServer.forEach(element => {
      expect(element.id).toBeDefined()
    })
  })

  test('new blog can be added', async () => {
    await api.post('/api/blogs')
      .send(blogNotOnServer)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const blogsOnServer = response.body.map(r => r)

    expect(blogsOnServer).toHaveLength(initialBlogs.length + 1)
  })

  test('adding a blog with empty likes field', async () => {
    const blogNoLikes = {
      title: "I wish someone liked me",
      author: "The Groke",
      url: "www.iwishsomeonelikedme.groke.net"
    }

    const response = await api.post('/api/blogs')
      .send(blogNoLikes)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('adding blogs without title or url fields', async () => {

    const malformedBlogs = [
    { author: "Me", url: "/home/me/Documents/Projects/myblog.html", likes: 0 },
    { title: "How do i post my blog to web?", author: "Me", likes: 0 },
    { author: "Me", likes: 354 }]
    
    const promiseArray = await malformedBlogs.map(async blog => {
      await api.post('/api/blogs')
        .send(blog)
        .expect(400)
    })

    await Promise.all(promiseArray)
    const response = await api.get('/api/blogs')
    const blogsOnServer = response.body
    expect(blogsOnServer).toHaveLength(initialBlogs.length)
  })
})