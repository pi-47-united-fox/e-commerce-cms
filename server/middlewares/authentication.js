const { User } = require('../models')
const jwt = require('jsonwebtoken')

const authentication = (req,res,next) => {
    const decoded = jwt.verify(req.headers.access_token, process.env.SECRET)
    // console.log(decoded)
    User.findOne({
        where: {
            email: decoded.email
        }
    })
    .then(user => {
        if(!user) {
            res.status(404).json({message: 'Not Found'})
        } else {
            req.userData = user
            next()
        }
    })
    .catch(err => {
        res.status(500).json({message: err})
    })
}

module.exports = authentication