const { User } = require("../models/index")
const { comparePassword } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")


class UserController {
    static homeController(req, res, next) {
        res.status(200).json({
            message: "You are on our ecommerce CMS"
        })
    }

    static login(req, res, next) {
        let email = req.body.email
        let password = req.body.password
        User.findOne({
            where: {
                email: email
            }
        })
            .then(data => {
                if(email === '' || password === '') {
                    res.status(400).json({
                        message: "Please fill the form carefully"
                    })
                } else if(!data) {
                    res.status(404).json({
                        message: "Wrong email/password"
                    })
                } else {
                    if(!comparePassword(password, data.password)) {
                        res.status(404).json({
                            message: "Wrong email/password"
                        })
                    } else {
                        res.status(200).json({
                            access_token: signToken({
                                id: data.id,
                                email: data.email,
                                role: data.role
                            })
                        })
                    }
                }
            })
            .catch(err => {
                next(err)
            })

    }
}

module.exports = UserController