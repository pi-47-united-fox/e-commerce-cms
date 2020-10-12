const {User} = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController{
    static register(req,res){
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
            res.status(500).json({message: err.errors[0].message})
        })
    }
    static login(req,res){
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
                    email: user.email
                }, 
                process.env.SECRET
                )
                res.status(201).json({access_token})
            } else {
                res.status(401).json({message: 'Invalid email / password'})
            }
        })
        .catch(err=> {
            console.log(err)
            res.status(500).json({message: err.message})
        })
    }
}

module.exports = UserController