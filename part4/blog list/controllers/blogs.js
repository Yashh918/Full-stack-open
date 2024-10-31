import { Router } from "express";
import Blog from "../models/blogs.js";
import User from "../models/users.js";
import logger from "../utils/logger.js";
import jwt from 'jsonwebtoken'

const blogRouter = Router()

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('author', { username: 1, name: 1 })
    return res
        .status(200)
        .json(blogs)
})

blogRouter.post('/', async (req, res) => {
    const { title, url, likes = 0 } = req.body

    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken) {
        return res
            .status(401)
            .json({ error: 'token invalid' })
    }

    if (!(title && url)) {
        return res
            .status(400)
            .json({ error: "Title and URL are required" });
    }

    const blog = new Blog({
        title,
        author: decodedToken.id,
        url,
        likes
    })

    const savedBlog = await blog.save()
    return res
        .status(201)
        .json(savedBlog)
})

blogRouter.patch('/:id', async (req, res) => {
    const { id } = req.params
    const { likes } = req.body

    const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { likes },
        { new: true, runValidators: true }
    )

    if (updatedBlog) {
        return res.status(200).json(updatedBlog);
    } else {
        return res.status(404).json({ error: "Blog not found" });
    }
})

blogRouter.delete('/:id', async (req, res) => {
    const { id } = req.params

    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken) {
        return res
            .status(401)
            .json({ error: 'token invalid' })
    }

    const blogToDelete = await Blog.findById(id)
    if (!blogToDelete) {
        return res
            .status(404)
            .json({ error: 'blog does not exist' })
    }

    if (decodedToken.id.toString() !== blogToDelete.author._id.toString()) {
        return res
            .status(401)
            .json({ error: 'Unauthorized request, you cannot delete others video' })
    }

    await Blog.deleteOne(blogToDelete)

    return res
        .status(200)
        .json({ success: 'blog deleted successfully' })

})

blogRouter.delete('/reset/all', async (req, res) => {
    await Blog.deleteMany({})
    return res.json({ message: 'All blogs deleted' })

})

export default blogRouter