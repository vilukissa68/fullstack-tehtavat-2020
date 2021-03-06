const lodash = require('lodash')
const User = require('../models/user')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let total = 0
  blogs.forEach(element => {
    total = total + element.likes
  })
  return total
}

const favoriteBlog = (blogs) => {
  if( blogs.length === 0 ){
    return {}
  }
  let fBlog = {}
  let maxLikes = 0

  blogs.forEach(blog => {
    if(blog.likes > maxLikes){
      fBlog = blog
      maxLikes = blog.likes
    }
  })

  return fBlog
}

const mostBlogs = (blogs) => {
  if( blogs.length === 0 ){
    return {}
  }

  let most = lodash.chain(blogs)
    .groupBy("author")
    .map((value, key) => ({ author: key, blogs: value.length }))
    .max()
    .value()
  return most
}

const mostLikes = (blogs) => {
  if ( blogs.length === 0){
    return {}
  }

  let likes = lodash.chain(blogs)
    .groupBy("author")
    .map((value, key) => ({ author: key, likes: lodash.sumBy(value, "likes")}))
    .maxBy("likes")
    .value()

  return likes

}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  usersInDb
}