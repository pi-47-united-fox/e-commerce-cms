const {User} = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController{
    static register(req,res,next){
        const userData = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(userData)
        .then(user => {
            res.status(201).json({
                id: user.id, 
                email:user.email,
            })
        })
        .catch(err=> {
            next()
        })
    }
    static login(req,res,next){
        const userData = {
            email: req.body.email,
            password: req.body.password
        }

        User.findOne({
            where: {
                email: userData.email
            }
        })
        .then(user => {
            if(user && bcrypt.compareSync(userData.password, user.password)){
                const access_token = jwt.sign({
                    id: user.id,
                    email: user.email,
                    role: user.role
                }, 
                process.env.SECRET
                )
                res.status(200).json({access_token, message: 'Successfully Login'})
            } else {
                res.status(401).json({message: 'Invalid email / password'})
            }
        })
        .catch(err=> {
            next()
        })
    }
}

module.exports = UserController