const { User } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET
console.log(SECRET);
class UserController {
    static register(req, res, next) {
        let user = {
            email: req.body.email,
            password: req.body.password,
            role:req.body.role
        }
        User.create(user)
            .then(data => {
                return res.status(201).json(data)
            })
            .catch(err => {
                return next(err)
            })
    }

    static login(req, res, next) {
        console.log('masuk login page');
        let user = {
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        }
        console.log(user);
        User.findOne({
            where: {
                email: user.email
            }
        })
            .then(data => {
                // console.log(SECRET, data);
                if (data && bcrypt.compareSync(user.password, data.password)) {
                    let access_token = jwt.sign({ id: data.id, email: data.email }, SECRET)
                    return res.status(201).json({ access_token })
                } else {
                    return res.status(400).json({ messege: `Invalaid email or password` })
                }
            })
            .catch(err => {
                return next(err)
            })
    }
}


module.exports = UserController