const usersRouter = require('express').Router()
const user = require('../models/user')
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', (request, response) => {
    User
        .find({}, ['id', 'username', 'blogs', 'name'])
        .populate('blogs', {url: 1, author: 1, title: 1})
        .then(users => {
            response.json(users)
        })
})

usersRouter.post('/', async (request, response) => {
    if(
        Object.hasOwn(request.body, 'username') &&
        request.body.username.length >= 3 &&
        Object.hasOwn(request.body, 'password') && 
        request.body.password.length >= 3
    ){
        const { username, name, password } = request.body

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username: username,
            password: passwordHash,
            name: name
        })

        const savedUser = await user.save()
        delete savedUser.password
        response.status(201).json(savedUser)
    }
    else{
        response.sendStatus(400)
    }
})

module.exports = usersRouter