import router from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/users.js'

const loginRouter = router()

loginRouter.post('/', async (req, res) => {
    const {username, password} = req.body

    if(!(username && password)){
        return res
            .status(401)
            .json({error: 'username and password are required'})
    }

    const user = await User.findOne({username})
    if(!user){
        return res
            .status(404)
            .json({error: 'invalid username'})
    }

    const passwordCheck = await bcrypt.compare(password, user.passwordHash)
    if(!passwordCheck){
       return res
        .status(401)
        .json({error: 'invalid password'})
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }
    
    const token = jwt.sign(
        userForToken,
        process.env.SECRET
    )

    console.log('logged innnn')

    return res
        .json({token, username: user.username, name: user.name})

})

export default loginRouter