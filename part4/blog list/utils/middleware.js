import jwt from 'jsonwebtoken'

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
    if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error'))
        return res.status(400).json({ error: 'expected `username` to be unique' })
    else if (error.name === 'JsonWebTokenError')
        return res.status(401).json({ error: 'token invalid' })

    next(error)
}

const tokenExtracter = (req, res, next) => {
    const authorization = req.get('authorization')

    if (authorization && authorization.startsWith('Bearer ')) {
        req.token = authorization.replace('Bearer ', '')
    }

    next()
}

const userExtracter = (req, res, next) => {
    if (req.token) {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        req.user = decodedToken.username
    }
    
    next()
}

export default {
    unknownEndpoint,
    errorHandler,
    tokenExtracter,
    userExtracter
}