const { Product } = require('../models')


class ProductController{
    static addProductHandler(req,res,next){
        const { name,image_url,price,stock } = req.body

        let newProduct = {
            name,image_url,price,stock
        }
        Product.create(newProduct)
            .then((result)=>{
                res.status(201).json({id:result.id,name:result.name,image_url:result.image_url,price:result.price,stock:result.stock})
            })
            .catch(err=>{
                console.log(err)
                if(err.name === 'SequelizeValidationError'){
                    next({name:err.name,message:err.errors[0].message,status:400})
                }else{
                    next(err)
                }
            })
    }

    static getProductHandler(req,res,next){
        Product.findAll({
            order:[['id','asc']]
        })
            .then(result=>{
                res.status(200).json(result)
            }).catch(err=>{
                console.log(err)
                next(err)
            })
    }

    static editProductHandler(req,res,next){
        const id = +req.params.id
        const { name,image_url,price,stock } = req.body
        const updatedProduct = {
            name,image_url,price,stock
        }

        Product.update(updatedProduct,{where:{id}})
        .then(()=>{
            res.status(200).json({message:'success update product'})
        })
        .catch(err=>{
            console.log(err,'err')
            if(err.name === 'SequelizeValidationError'){
                    next({name:err.name,message:err.errors[0].message,status:400})
                }else{
                    next(err)
                }
        })
    }

    static deleteProductHandler(req,res,next){
        let id = +req.params.id
        Product.destroy({where:{id}})
            .then(()=>{
                res.status(200).json({message:`delete task id = ${id} successfully`})
            })
            .catch(err=>{
                next(err)
            })
    }
}


module.exports = {
    ProductController
}