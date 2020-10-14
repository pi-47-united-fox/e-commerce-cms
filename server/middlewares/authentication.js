const { User } = require("../models/index")
const { decodeToken } = require("../helpers/jwt")

const authentication = (req, res, next) => {
    let decoded = decodeToken(req.headers.access_token)
    console.log(decoded)
    User.findOne({
        where: {
            id: decoded.id
        }
    })
        .then(data => {
            req.userData = decoded
            next()
        })
        .catch(err => {
            console.log(err)
        })

}


module.exports = authentication