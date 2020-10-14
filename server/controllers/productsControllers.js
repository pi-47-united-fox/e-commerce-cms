const { Product } = require('../models')
class ProductControllers{

    static getAllProduct(req, res, next){
        Product.findAll()
        .then(product => {
            // console.log(products)
            if(product == null){
                return res.status(404).json({msg:'Not Found'})
            }
            return res.status(200).json({products: product})
        })
        .catch(err => {
            // console.log(err, 'error dari get all')
            next(err)
        })
    }

    static getOneProducts(req,res,next){
        const idProduct= req.params.id;
        Product.findByPk(idProduct)
        .then(product => {
            if(product == null){
                return res.status(404).json({msg:'Not Found'})
            }
            return res.status(200).json({id: product.id, name: product.name, image_url: product.image_url, price: product.price,stock: product.stock, category:product.category, UserId: product.UserId})
        })
        .catch(err => {
            // console.log(err,'err dari findOne')
            next(err)
        })
    }

    static AddProduct(req,res,next){
      const inputProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category,
            UserId: req.userData.id
        }
        Product.create(inputProduct)
        .then(product => {
            return res.status(201).json({id: product.id, name: product.name, image_url: product.image_url, price: product.price,stock: product.stock, category:product.category, UserId: product.UserId})
        })
        .catch(err => {
            // console.log(err, 'dari err add')
            next(err)
        })
    }

    static editProduct(req,res,next){
        const inputProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category,
        }
        Product.update(inputProduct,{where : {
            id: +req.params.id
        }})
        .then(product => {
            return res.status(201).json(product)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static editElement(req, res, next) {
        console.log(+req.params.id, 'id >>')
        const editCategory = {
            category : req.body.category
        }
        Product.update(editCategory, 
            {where: {id: +req.params.id}
        })
            .then(product => {
            
            return res.status(200).json(product)
        })
        .catch(err => {
        console.log(err,'patch')
           next(err)
        })
    }

    static deleteProduct(req, res,next){
        Product.destroy({where: {id: +req.params.id}})
        .then(product => {
            return res.status(200).json(product)
        })
        .catch(err => {
            console.log(err, 'ini err delete')
           next(err)
        })
    }
}
module.exports = ProductControllers