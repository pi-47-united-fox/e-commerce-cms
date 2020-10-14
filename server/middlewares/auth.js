const jwt = require("jsonwebtoken")
const secret_key = 'abcd1234'
const {User, Product} = require("../models")
function authentication(req,res,next){
    const {access_token} = req.headers
    // console.log(access_token);
    if(access_token){
        let decode = jwt.verify(access_token,secret_key)
        // console.log(decode);
        req.userData = decode
        next()
    }else{ 
        next({name:"Unauthenticated"})
    }
}

function authorization(req,res,next){ 
    User.findByPk(req.userData.id)
        .then(user=>{
            if(user.role == 'admin'){
                next()
            }else{
                next({name: 'Not Authorized'})
            }
        })
        .catch(err=>{
            next(err)
        })
}

module.exports = {authentication,authorization}