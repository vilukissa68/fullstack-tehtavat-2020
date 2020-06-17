const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))

})

blogsRouter.post('/', async (request, response) => {

  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0
  })

  const savedBlog = await blog.save()
  response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  console.log("Put request:")
  const body = request.body

  const updatedBlog = {
    title: body.title,
    author: body.title,
    url: body.url,
    likes: body.likes ? body.likes : 0
  }

  const blog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true})
  console.log(blog)
  response.json(blog)
})

module.exports = blogsRouter