import { after, beforeEach, describe, test } from 'node:test'
import assert from 'node:assert'
import supertest from 'supertest'
import mongoose from 'mongoose'
import app from '../app.js'
import Blog from '../models/blogs.js'
import helper from './test_helper.js'
import User from '../models/users.js'
import { log } from 'node:console'

const api = supertest(app)

describe('blog api', async () => {
    beforeEach(async () => {
        await User.deleteMany({})
        await User.create(helper.singleUser)
        
        // console.log('before each block')
        // const users = await helper.usersInDb()
        // console.log(users)
    })

    // test('blogs are returned as json', async () => {
    //     await api
    //         .get('/api/blogs')
    //         .expect(200)
    //         .expect('Content-Type', /application\/json/)
    // })

    // test('blogs contain unique identifier id', async () => {
    //     const response = await api.get('/api/blogs')
    //     const blogs = response.body

    //     blogs.forEach(blog => {
    //         assert.ok(blog.hasOwnProperty('id'))
    //     })

    // })

    // only test that matters right now
    test('valid blog can be posted', async () => {
        const login = await api
            .post('/api/login')
            .send({
                username: helper.singleUser.username,
                password: helper.singleUser.password
            })


        const newBlog = {
            title: 'Sakura is underrated',
            url: 'trustme.bro',
            likes: '392671'
        }
        
        console.log('login token is ', login.body.token)

        // await api
        //     .post('/api/blogs')
        //     .send(newBlog)
        //     .set('Authorization', login.token)
        //     .expect(201)
        //     .expect('Content-Type', /application\/json/)

        // const blogsAtEnd = await helper.blogsInDb()
        // assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

        // const titles = blogsAtEnd.map(blog => blog.title)
        // assert(titles.includes('Sakura is underrated'))
    })

    // test('if likes is missing, then initialize it to zero', async () => {
    //     const newBlog = {
    //         title: 'Sakura is underrated',
    //         author: 'Sasuke',
    //         url: 'trustme.bro',
    //     }

    //     const res = await api
    //         .post('/api/blogs')
    //         .send(newBlog)
    //         .expect(201)
    //         .expect('Content-Type', /application\/json/)

    //     assert.strictEqual(res.body.likes, 0)

    //     const blogsAtEnd = await helper.blogsInDb()
    //     const addedBlog = blogsAtEnd.find(blog => blog.title === 'Sakura is underrated')
    //     assert.strictEqual(addedBlog.likes, 0)
    // })

    // test('if content or url is missing, responds with 400 status', async () => {
    //     const blogs = [
    //         {
    //             author: 'Sasuke',
    //             likes: '392671'
    //         },
    //         {
    //             author: 'Sasuke',
    //             url: 'trustme.bro',
    //             likes: 392671
    //         },
    //         {
    //             title: 'Sakura is underrated',
    //             author: 'Sasuke',
    //             likes: 392671
    //         }
    //     ]

    //     blogs.forEach(async blog => {
    //         const res = await api
    //         .post('/api/blogs')
    //         .send(blog)
    //         .expect(400)
    //     })

    // })

    // test('updation of a note', async () => {
    //     const newBlog = {
    //         likes: 600000
    //     }

    //     const blogToUpdate = await Blog.findOne({ title: 'Naruto - the greatest hokage' })

    //     const res = await api
    //         .patch(`/api/blogs/${blogToUpdate.id}`)
    //         .send(newBlog)

    //     assert.strictEqual(newBlog.likes, res.body.likes)
    //     assert.strictEqual(blogToUpdate.title, res.body.title)
    // })

    // test('deletion of a note', async () => {
    //     const blogsAtStart = await helper.blogsInDb()
    //     const blogToDelete = blogsAtStart[0]

    //     await api
    //         .delete(`/api/blogs/${blogToDelete.id}`)
    //         .expect(204)

    //     const blogsAtEnd = await helper.blogsInDb()
    //     assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

    //     const titles = blogsAtEnd.map(blog => blog.title)
    //     assert(!titles.includes(blogToDelete.title))
    // })
})

after(async () => {
    await mongoose.connection.close()
})