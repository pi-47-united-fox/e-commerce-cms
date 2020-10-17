'use strict'
const { verifyToken } = require("../helpers/jwt")
const {User} = require("../models/index")



const authentication = (req, res, next)=> {
    const decoded = verifyToken(req.headers.access_token)
    User.findByPk(decoded.id)
    .then(data=> {
        if (!data) {
            res.status(404).json({msg: 'username not found'})
        }
        else {
            req.userData = data
            next()
        }
    })
    .catch (err=> {
        res.status(500).json(err)
    }) 
}

module.exports = authentication