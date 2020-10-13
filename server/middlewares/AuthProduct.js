const { Product } = require('../models')

const AuthProduct=(req,res,next)=>{
    const id = +req.params.id
    Product.findByPk(id)
        .then(result=>{
            if(!result){
                next({name:'product not found', message:'Product not found',status:404})
            }else{
                next() 
            }
        })
        .catch(err=>{
            console.log(err)
            next(err)
        })
}


module.exports = {
    AuthProduct
}