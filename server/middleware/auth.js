const { verify } = require("../helper/jwt")
const { User, Product } = require("../models")

const authentication = (req, res, next) => {
    const decode = verify(req.headers.access_token)
    User.findOne({ where: { role: "admin" } })
        .then(user => {
            if (!user) {
                throw ({
                    name: "unauthorized",
                    message: 'not found user',
                    statusCode: 400
                })
            } else {
                req.userData = decode
                next()
            }
        })
        .catch(err => {
            next(err)
        })
}

const authorization = (req, res, next) => {

    Product.findByPk(req.params.id)
        .then(data => {
            if (!data) {
                throw ({
                    name: "unauthorized",
                    message: 'not found data',
                    statusCode: 400
                })
            } else if (req.userData.role !== "admin") {
                throw ({
                    name: "unauthorized",
                    message: "you're not authorized",
                    statusCode: 400
                })
            } else {
                next()
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = {
    authentication, authorization
};



