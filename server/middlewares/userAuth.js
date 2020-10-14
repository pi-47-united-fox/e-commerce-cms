const { verifyToken } = require('../helpers/jwt.js')
const { User, Stock } = require('../models/index.js')

// middleware for user authentication
const authentication = (req, res, next) => {
    const { access_token } = req.headers
    if(access_token){
        let decode = verifyToken(access_token)
        req.userData = decode
        User.findByPk(req.userData.id)
            .then(result => {
                if(!result){
                    next({name:'Not Found', message: "User not found."})
                }
                next()
            })
            .catch(err => {
                next(err)
            })
    }
    else{
        next({name: 'Unauthorized', message: "Invalid access!"})
    }
}

// middleware for user authorization
const authorization = (req, res, next) => {
    const userData = req.userData

    User.findOne({
        where:{
            email: userData.email
        }
    })
        .then(result => {
            if(result && result.role === 'admin'){
                next()
            }
            else if(result && result.role !== 'admin'){
                next({name:'Forbidden', message: "You are not authorized."})
            }
            else if(!result){
                next({name:'Not Found', message: "User not found."})
            }

        })
        .catch(err => {
            next(err)
        })

    
}

module.exports = {
    authentication,
    authorization
}