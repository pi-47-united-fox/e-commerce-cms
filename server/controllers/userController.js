const { User } = require('../models/index');
const bcryptjs = require("bcryptjs")
const { signToken } = require("../helper/jwt")

class UserController {

    static register(req, res, next) {

    }

    static async login(req, res, next) {
        const { email, password } = req.body

        try {
            let user = await User.findOne({ where: { email: email } })
            if (!user) {
                throw ({
                    name: "unauthorized",
                    message: 'wrong email/password !',
                    statusCode: 400
                })
            } else {
                let pass = bcryptjs.compareSync(password, user.password)
                if (!pass) {
                    throw ({
                        name: "unauthorized",
                        message: 'wrong email/password !',
                        statusCode: 400
                    })
                } else {
                    let access_token = signToken({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    })
                    return res.status(201).json({ access_token })
                }
            }
        } catch (err) {
            next(err)
        }


    }
}

module.exports = {
    UserController
};
