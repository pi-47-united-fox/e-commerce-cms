'use strict'
const jwt = require('jsonwebtoken')

const signToken = (input)=> {
    let token = jwt.sign(input, 'e-commerce')
    return token
}
const verifyToken = (token)=> {
    return token = jwt.verify(token, 'e-commerce')
}

module.exports = {
    signToken,
    verifyToken
}