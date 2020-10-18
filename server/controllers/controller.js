const bcrypt = require("bcryptjs");
const {sign,verify} = require("../helpers/jwt");
const {User,Product} = require("../models")

class Controller{

    static postLogin(req,res,next){
        const {email,password} = req.body
        console.log(email,password, "<<<<<<<<<<<<<<<<<");
        
        if(!email && !password){ //handle empty input
            next({name:"Wrong Email or Password"})
        }else{
            User.findOne({where:{
                email:email
            }})
                .then(user=>{ 
                    if(user  && bcrypt.compareSync(String(password), user.password)){
                        let token = sign({id:user.id,email:user.email,role:user.role})
                        res.status(202).json({access_token:token})
                    }else{
                        next({name:"Wrong Email or Password"})
                    }
                })
                .catch(err=>{
                    console.log(err);
                    next(err)
                }) 
        }

    }



}

module.exports = Controller