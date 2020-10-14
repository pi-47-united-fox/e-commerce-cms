const { User } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt.js')
const { signToken } = require('../helpers/jwt.js') 


class UserController{
    static login(req, res, next){
        const userInput = {
            email: req.body.email,
            password: req.body.password
        }
        if(userInput.email === '' || userInput.password === ''){
            res.status(400).json({
                name: "Bad Request",
                message: "Please input email and/or password"
            })
        }
        else{
            User.findOne({
                where:{
                    email: userInput.email
                }
            })
                .then(user => {
                    if(!user){
                        res.status(401).json({
                            name: 'Unauthorized',
                            message: 'Wrong email or password!'
                        })
                        // next({
                        //     name: 'Unauthorized',
                        //     message: 'Please use the correct email or password!'
                        // })
                    }
                    else if(!comparePassword(userInput.password, user.password)) {
                        res.status(401).json({
                            name: 'Unauthorized',
                            message: 'Wrong email or password!'
                        })
                        // next({
                        //     name: 'Unauthorized',
                        //     message: 'Please use the correct email or password!'
                        // })
                    }
                    else{
                        const access_token = signToken({id:user.id, email: user.email})
                        res.status(200).json({access_token})
                    }
                })
                .catch(err => {
                    return res.status(500).json({message: err.message})
                })

        }

    }
}

module.exports = UserController