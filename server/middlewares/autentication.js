const { User } = require('../models')
const {Jwt}    = require('../helpers')

module.exports = (req, res, next) => {
    const { access_token } = req.headers
    const encoded = Jwt.check(access_token)
    User.findOne({
        where: { email: encoded.email }
    }).then((result) => {
        if (result) {
            req.userData = encoded
            next()
        }
        else {
            next({
                name: 'not found'
            })
        }
    }).catch((err) => {
        next(err)
    })
}