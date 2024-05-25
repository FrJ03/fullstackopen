const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})
router.post('/reset/user/:id', async (request, response) => {
    const id = request.params.id
    await User.deleteMany({_id: id})
  
    response.status(204).end()
  })

module.exports = router