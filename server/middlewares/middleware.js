const jwt = require('jsonwebtoken')
const {User} = require('../models/index')

const authentication = (req,res,next) =>{
    const {access_token} = req.headers
    if(access_token){
        const decode = jwt.verify(access_token, process.env.SECRET)
        req.userData = decode
        User.findByPk(req.userData.id)
        .then(data=>{
            if(!data){
                next({
                    name: "Not Found",
                    message: "Not Found"
                })
            }
            else if(req.userData.role !== 'admin'){
                next({
                    name: "Unauthorized",
                    message: "You are not an admin"
                })
            }
            else{
                next()
            }
        })
        .catch(err=>{
            res.status(500).json({message : err.message})
        })
    }
    else{
        res.status(401).json({message: 'You are not authenticated'})
    }
}



module.exports = {authentication}