const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt');

const Authentication=(req,res,next)=>{
    console.log('masuk authentication')
    let decoded;
    if(req.headers.access_token){
         decoded = verifyToken(req.headers.access_token)
    }else{
        next({name:'login needed', message:'login first',status:401})
    }
    
    User.findOne({where:{email:decoded.email}})
    .then(user =>{
            if(!user){
                next({name:'user not found', message:'User not found', status:404})
            }else{
                req.userData = decoded
                next()
            }
        })
        .catch(err=>{
            next(err)
        })
}



module.exports = {
    Authentication
}