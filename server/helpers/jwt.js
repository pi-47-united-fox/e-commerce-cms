const jwt = require('jsonwebtoken')

class Jwt {
    static generate(id, email, role) {
        return jwt.sign({
            id: id,
            email: email,
            role: role
        }, process.env.JWT_SECRET)
    }

    static check(access_token) {
        return jwt.verify(access_token, process.env.JWT_SECRET)
    }
}

module.exports = Jwt