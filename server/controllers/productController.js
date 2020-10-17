const {Product,Category} = require("../models")

class ProductController{

    static postProduct(req,res,next){
        const {name,image_url,price,stock,CategoryId} = req.body 
        console.log(req.body);
        Product.create({name,image_url, price ,stock,CategoryId})
            .then(result=>{
                res.status(201).json(result)
            })
            .catch(err=>{
                console.log(err);
                next(err)
            })
    }

    static getProducts(req,res,next){ 
        Product.findAll()
            .then(result=>{
                res.status(200).json(result)
            })
            .catch(err=>{
                next(err)
            })
    }

    static getCategories(req,res,next) {
        Category.findAll()
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            next(err)
        })
    }

    static putProduct(req,res,next){ 
        Product.update(req.body, {where:{id: req.params.id}})
            .then(()=>{
                res.status(200).json({msg:"Updated Successfully"})
            })
            .catch(err=>{
                next(err)
            })
    }

    static deleteProduct(req,res,next){ 

        Product.destroy({where: {id: +req.params.id}})
            .then(data => {
                res.status(200).json({msg: 'Deleted Successfully'})
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ProductController