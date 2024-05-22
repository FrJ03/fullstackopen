const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', (request, response) => {
    if(Object.hasOwn(request.body, 'title') && Object.hasOwn(request.body, 'url')){
        const blog = new Blog(request.body)

        blog
            .save()
            .then(result => {
                response.status(201).json(result)
            })
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