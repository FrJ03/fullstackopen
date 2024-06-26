const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      request.token = authorization.replace('Bearer ', '')
    }
    else{
        request.token = null
    }
  
    next()
}

const userExtractor = (request, response, next) => {
    if(!request.token){
        response.status(401).json({ error: 'token invalid' })
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        response.status(401).json({ error: 'token invalid' })
    }
    else{
        request.user = decodedToken
    }
  
    next()
}

module.exports = {
    tokenExtractor,
    userExtractor
}