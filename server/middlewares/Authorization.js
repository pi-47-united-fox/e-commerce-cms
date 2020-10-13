const { Product } = require('../models')

const Authorization=(req,res,next)=>{
    console.log('masuk author')
    if(req.userData.role !== 'admin'){
        next({name:'not authorized',message:'Not Authorized',status:401})
    }else{
        next()
    }
    // const id = +req.params.id
    // console.log(id)
    // Product.findByPk(id)
    //     .then(result=>{
    //         if(!result){
    //             next({name:'product not found', message:'Product not found',status:404})
    //         }else{
    //             next() 
    //         }
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //         next(err)
    //     })
}


module.exports = {
    Authorization
}