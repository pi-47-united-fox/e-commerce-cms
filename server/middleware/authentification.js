const { checkToken } = require('../helpers/jwt')
const { User } = require('../models')

const authentification = (req, res, next) => {
    const decoded = checkToken(req.headers.access_token)
    User.findOne({
        where: {
            email: decoded.email
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).json({ msg: `User not found!` })
            } else {
                req.userData = decoded
                next()
            }
        })
        .catch(err => {
            console.log(err, "errrorr")
            return res.status(500).json({ msg: err.message })
        })
}

module.exports = authentification