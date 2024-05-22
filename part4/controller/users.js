const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', (request, response) => {
    User
        .find({})
        .then(users => {
            response.json(users)
        })
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username: username,
        password: passwordHash,
        name: name
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = usersRouter