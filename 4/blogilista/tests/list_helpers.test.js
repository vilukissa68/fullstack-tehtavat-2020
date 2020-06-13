const listHelper = require('../utils/list_helpers')

const threeBlogs = [
{title: "My First Blog", author: "Me", url: "thisfreeblogsitetotallydoesntstealyourinformationandsellit", likes: 0},
{title: "Existential questions about eating honey as a bear", author: "Winnie",  url: "www.existentialhoney.com", likes: 345},
{title: "Final Blog of The Trilogy", author: "asd", url: "localhost", likes: 42}
]


describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {
  test('when list is empty', () => {
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })

  test('when list has only one blogs', () => {
    const blogs = [{
      title: "Okay blog",
      author: "Bob The Blogger",
      url: "www.bobsblogs.blog.com",
      likes: 26 
    }]
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(blogs[0].likes)
  })

  test('when list has more than one blogs', () => {
   const result = listHelper.totalLikes(threeBlogs)
  expect(result).toBe(0+345+42)
  })
})

describe('favorite blog', () => {
  test('when list is empty', () => {
    const blogs = []
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({})
  })

  test('when list ahas more the one blogs', () => {
    const result = listHelper.favoriteBlog(threeBlogs)
    expect(result).toEqual(threeBlogs[1])
  })
})