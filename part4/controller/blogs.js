const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware');

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .populate('user', {username: 1, name: 1})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    if(Object.hasOwn(request.body, 'title') && Object.hasOwn(request.body, 'url')){
        let blogJSON = request.body

        const user = await User.findById(request.user.id)

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
blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const blogId = request.params.id

    const blog = await Blog.findOne({_id: blogId})

    if(blog === null){
        response.sendStatus(404)
    }
    else if(blog.user && request.user.id === String(blog.user)){
        Blog
        .deleteOne({_id: blogId})
        .then(result => {
            response.sendStatus(200)
        })
        .catch(() => {
            response.sendStatus(404)
        })
    }
    else{
        response.sendStatus(401)
    }
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