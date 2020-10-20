'use strict'
const { compare } = require('../helpers/bcrypt')
const {User} = require('../models/index')
const {signToken} = require('../helpers/jwt')


class UserController {
    static async register(req, res, next) {
        const newAccount = {
            email: req.body.email,
            password: req.body.password,
        }
        try{
            const data = await User.create(newAccount)
            res.status(201).json(data)
        }catch (err) {
            res.status(err)
        }
    }

    static async login(req,res,next) {
        const account = {
            email: req.body.email,
            password: req.body.password,
        }
        if (account.email == '' && account.password == '') {
            next({
                name: 'Unauthorized',
                message:  "email and password must be filled"
            })
        }
        try {
            const data = await User.findOne({
                where: {
                    email: account.email
                }
            })
            if(!data) {
                next({
                    name: 'Unauthorized',
                    message:  "email/password is wrong."
                })
            }
            else if(!compare(account.password, data.password)) {
                next({
                    name: 'Unauthorized',
                    message:  "email/password is wrong."
                })
            }
            else {
                const access_token = signToken({
                    id: data.id,
                    email:data.email
                })
                res.status(200).json({
                    id: data.id,
                    email:data.email,
                    access_token: access_token
                })
            }
        } catch (err) {
            res.status(500).json(err)
        }
    } 
}
module.exports = UserController
