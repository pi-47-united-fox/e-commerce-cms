const jwt = require("jsonwebtoken")

function signToken(payload) {
    return jwt.sign(payload, 'donttellanyone')
}

function decodeToken(access_token) {
    return jwt.verify(access_token, 'donttellanyone')
}

module.exports = {
    signToken,
    decodeToken
}