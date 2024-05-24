const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const { send } = require('node:process')

const api = supertest(app)

const initialUsers = [
    {
        username: 'hellas',
        name: 'Arto Hellas',
        password: 'ffdhsajkfhkfldfdsa'
    },
    {
        username: 'mluukkai',
        name: 'Matti Luukkai',
        password: 'ffdhsajkfhkfldfdsa'
    }
]
describe('User API Tests', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    
        for (let user of initialUsers) {
            let userObject = new User(user)
            await userObject.save()
        }
    })
    describe('Get all users tests', () => {
        test('users are returned as json', async () => {
            await api
                .get('/api/users')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })
        test('users size', async () => {
            const response = await api.get('/api/users')
            assert.strictEqual(response.body.length, initialUsers.length)
        })
        test('users id', async () => {
            const response = await api.get('/api/users')

            assert.strictEqual(Object.hasOwn(response.body[0], 'id'), true)
            assert.strictEqual(Object.hasOwn(response.body[0], '_id'), false)
        })
    })
    describe('Adding users tests', () => {
        test('Adding a new blog', async () => {
            const newUser = {
                username: 'hellas1',
                name: 'Arto Hellas',
                password: 'ffdhsajkfhkfldfdsafdsa'
            }
            await api
                .post('/api/users')
                .send(newUser)
                .expect(201)

            const response = await api.get('/api/users')
            assert.strictEqual(response.body.length, initialUsers.length + 1)
        })
        test('Adding a new user without username property', async () => {
            const newUser = {
                name: 'Arto Hellas',
                password: 'ffdhsajkfhkfldfdsafdsa'
            }
            await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
        })
        test('Adding a new user without password property', async () => {
            const newUser = {
                username: 'hellas1',
                name: 'Arto Hellas',
            }
            await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
        })
        test('Adding a new user with an invalid username (less than 3 characters)', async () => {
            const newUser = {
                username: 'he',
                name: 'Arto Hellas',
                password: 'ffdhsajkfhkfldfdsafdsa'
            }
            await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
        })
        test('Adding a new user with an invalid password (less than 3 characters)', async () => {
            const newUser = {
                username: 'hellas1',
                name: 'Arto Hellas',
                password: 'ff'
            }
            await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
        })
    })
})
after(async () => {
    await mongoose.connection.close()
})