const {User} = require('../models/index')
const Helper = require('../helper/helper')

class userController {
    static async loginHandler(req, res, next) {
        const obj = {
            email: req.body.email,
            password: req.body.password
        }
        if (!obj.email || !obj.password) {
            next({
                name: "Bad Request",
                message: "Email and Password can't Empty"
            })
        }
        try {
            const data = await User.findOne({
                where: {
                    email: obj.email
                }
            })
            console.log(data)
            if(!data || !Helper.comparePassword(obj.password, data.password)){
                next({
                    name: "Unauthorized",
                    message: "Wrong email/password"
                })
            }

            else {
                const obj = {
                    id: data.id,
                    email: data.email,
                    role: data.role
                }
                const access_token = Helper.signToken(obj)
                res.status(201).json({
                    access_token
                })
                req.headers = access_token
            }


        }
        catch (err) {
            next(err)
        }
    }

}

module.exports = userController
