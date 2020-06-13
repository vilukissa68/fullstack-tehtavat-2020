const listHelper = require('../utils/list_helpers')


const threeBlogs = [
{title: "My First Blog", author: "Me", url: "thisfreeblogsitetotallydoesntstealyourinformationandsellit", likes: 0},
{title: "Existential questions about eating honey as a bear", author: "Winnie",  url: "www.existentialhoney.com", likes: 345},
{title: "Final Blog of The Trilogy", author: "asd", url: "localhost", likes: 42}
]

const manyAuthors = [
  {title: "My First Blog", author: "Me", url: "thisfreeblogsitetotallydoesntstealyourinformationandsellit", likes: 0},
  {title: "My Second Blog", author: "Me", url: "thisfreeblogsitetotallydoesntstealyourinformationandsellit", likes : 2},
  {title: "My Third Blog", author: "Me", url: "thisfreeblogsitetotallydoesntstealyourinformationandsellit", likes: 3},
  {title: "My Final Blog I'm quitting", author: "Me", url: "thisfreeblogsitetotallydoesntstealyourinformationandsellit", likes: 2},
  {title: "Existential questions about eating honey as a bear", author: "Winnie",  url: "www.existentialhoney.com", likes: 345},
  {title: "Natural enemies: bears and tigers", author: "Winnie", url: "www.naturalenemies.org", likes: 275},
  {title: "Buying right size t-shirts, preferably red ones", author: "Winnie", url: "www.heretogetshirts.red", likes: 1917},
  {title: "asd", author: "Test", url: "www.com", likes: 404}
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

describe('most blogs', () => {
  test('when list is empty', () => {
    const blogs = []
    const result = listHelper.mostBlogs(blogs) 
    expect(result).toEqual({})
  })

  test('when list has many authors', () => {
    const result = listHelper.mostBlogs(manyAuthors)
    expect(result).toEqual({author: "Me", blogs: 4})
  })
})

describe('most likes', () => {
  test('when list has multiple authors', () => {
    const result = listHelper.mostLikes(manyAuthors)
    expect(result).toEqual({author: "Winnie", likes: 345+275+1917})
  })
})