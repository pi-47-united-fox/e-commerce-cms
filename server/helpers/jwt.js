const jwt = require('jsonwebtoken')

function getToken(payload){
    return token = jwt.sign(payload, process.env.SECRET)
}

function checkToken(token){
    return jwt.verify(token, process.env.SECRET)
}

module.exports ={
    getToken,
    checkToken
}