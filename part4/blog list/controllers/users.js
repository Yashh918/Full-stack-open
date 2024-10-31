import { Router } from "express";
import bcrypt from 'bcrypt'
import User from "../models/users.js";

const userRouter = Router()

userRouter.post('/', async (req, res) => {
    const {username, name, password} = req.body

    if(!(username && password)){
        return res
            .status(401)
            .json({error: "username and password are required"})
    }

    if(username.length < 3 || password.length < 3){
        return res
            .status(401)
            .json({error: "username and password must be atleast 3 characters long"})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })
    
    const savedUser = await user.save()

    return res
        .status(201)
        .json(savedUser)

})

userRouter.get('/', async (req, res) => {
    const users = await User.find({})
    return res
        .json(users)
})

userRouter.delete('/:id', async (req, res) => {
    const {id} = req.params

    await User.findByIdAndDelete(id)

    return res
    .status(204)
    .end()
})

userRouter.delete('/reset/all', async (req, res) => {
    await User.deleteMany({})

    return res.json({message: 'All users deleted'})
})

export default userRouter