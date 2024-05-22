const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')
    }
    return null
  }

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .populate('user', {username: 1, name: 1})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', async (request, response) => {
    if(Object.hasOwn(request.body, 'title') && Object.hasOwn(request.body, 'url')){
        let blogJSON = request.body

        const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' })
        }
        const user = await User.findById(decodedToken.id)

        blogJSON.user = user.id

        const blog = new Blog(blogJSON)

        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.status(201).json(savedBlog)
    }
    else{
        response.sendStatus(400)
    }
})
blogsRouter.delete('/:id', (request, response) => {
    const blogId = request.params.id
    Blog
        .deleteOne({_id: blogId})
        .then(result => {
            response.sendStatus(200)
        })
        .catch(() => {
            response.sendStatus(404)
        })
})
blogsRouter.put('/:id', (request, response) => {
    const blogId = request.params.id
    Blog
        .findOneAndUpdate({_id: blogId}, request.body)
        .then(result => {
            response.status(200).json(result)
        })
        .catch(() => {
            response.sendStatus(404)
        })
})

module.exports = blogsRouter