const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5
    },
    {
        title: 'Microsoft Secret',
        author: 'Bill Gates',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 20
    },
    {
        title: 'Apple Secret',
        author: 'Steve Jobs',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 15
    },
]
describe('Get all blogs tests', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('blogs size', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, initialBlogs.length)
    })
    test('blogs id', async () => {
        const response = await api.get('/api/blogs')

        assert.strictEqual(Object.hasOwn(response.body[0], 'id'), true)
        assert.strictEqual(Object.hasOwn(response.body[0], '_id'), false)
    })
})
describe('Adding blog tests', () => {
    test('Adding a new blog', async () => {
        const newBlog = new Blog({
            title: 'Apple Secret v2',
            author: 'Steve Jobs',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 13
        })
        await newBlog.save()

        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, initialBlogs.length + 1)
    })
    test('Adding a new blog without likes property', async () => {
        const newBlog = new Blog({
            title: 'Apple Secret v2',
            author: 'Steve Jobs',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf'
        })
        await newBlog.save()

        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body[response.body.length - 1].likes, 0)
    })
    test('Adding a new blog without tittle', async () => {
        const newBlog = {
            author: 'Steve Jobs',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 13
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
    test('Adding a new blog without url', async () => {
        const newBlog = {
            title: 'Apple Secret v2',
            author: 'Steve Jobs',
            likes: 13
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})
describe('Deleting blogs', () => {
    test('Deleting the first blog', async () => {
        const response1 = await api.get('/api/blogs')
        await api
            .delete(`/api/blogs/${response1.body[0].id}`)
            .expect(200)
        
        const response2 = await api.get('/api/blogs')
        assert.strictEqual(response2.body.length, response1.body.length - 1)
    })
    test('Deleting a blog that not exists', async () => {
        await api
            .delete(`/api/blogs/0`)
            .expect(404)
    })
})

after(async () => {
  await mongoose.connection.close()
})

beforeEach(async () => {
    await Blog.deleteMany({})
  
    for (let blog of initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
})