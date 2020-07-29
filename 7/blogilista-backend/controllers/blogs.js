const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs.map(blog => blog.toJSON()))

})

blogsRouter.post('/', async (request, response) => {

  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id){
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  const responseBlog = await Blog.findById(savedBlog.id).populate('user', { username: 1, name: 1, id: 1 })
  console.log(responseBlog)
  response.json(responseBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id){
    return response.status(401).json({ error: 'token missing or invalid.' })
  }
  const blogToRemove = await Blog.findById(request.params.id)

  if(!blogToRemove){
    return response.status(404).json({ error: 'blog does not exist' })
  }

  if (blogToRemove.user.toString() !== decodedToken.id.toString()){
    return response.status(401).json({ error: 'only user who created the blog is allowed to delete it.'})
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})


blogsRouter.put('/:id', async (request, response) => {

  const body = request.body

  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0
  }

  const blog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true }).populate('user', { username: 1, name: 1, id: 1 })
  console.log(blog)
  response.json(blog)
})

module.exports = blogsRouter
