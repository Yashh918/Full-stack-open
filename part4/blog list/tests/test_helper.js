import Blog from "../models/blogs.js";
import User from "../models/users.js";

const initialBlogs = [
    {
        title: 'Naruto - the greatest hokage',
        url:'trustme.bro',
        likes: '500000'
    },
    {
        title: 'Boruto - the era of peace',
        author: 'Konohamaru',
        url:'trustbe.bro',
        likes: '368392'
    },
]

const initalUsers = [
    {
        username: 'Ash',
        name: 'Yashh',
        password: 'mehhh'
    },
    {
        username: 'Neha',
        name: 'Niharika',
        password: 'mehhh'
    },
    {
        username: 'Rimmie',
        name: 'Rim',
        password: 'mehhh'
    },
]

const singleUser = {
    username: 'Ash',
    name: 'Yashh',
    password: 'mehhh'
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

export default {
    initialBlogs,
    initalUsers,
    singleUser,
    blogsInDb,
    usersInDb
}