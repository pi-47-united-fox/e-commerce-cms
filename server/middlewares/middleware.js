const jwt = require('jsonwebtoken')
const {User} = require('../models/index')

let id

const authentication = (req,res,next) =>{
    const {access_token} = req.headers
    if(access_token){
        const decode = jwt.verify(access_token, process.env.SECRET)
        req.userData = decode
        id = req.userData.id
        User.findByPk(req.userData.id)
        .then(data=>{
            if(!data){
                next({
                    name: "Not Found",
                    message: "Not Found"
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

const authorization = async (req,res,next) =>{
    try{
        const user = await User.findOne({
            where:{
                id: +id
            }
        })
        if(user && user.role === 'admin'){
            next()
        }else{
            next({
                name: "Forbidden"
            })
        }
    }
    catch(err){
        return next(err)
    }
}



module.exports = {authentication,authorization}