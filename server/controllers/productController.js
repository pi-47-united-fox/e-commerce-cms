const {Product} = require('../models/index')

class productController{
    static addHandler(req,res,next){
        const input = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category
        }
        Product.create(input)
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            //console.log(JSON.stringify(err,null,2))
            next(err)
        })
    }

    static async listHandler(req,res,next){
        try{
            const data = await Product.findAll() 

            res.status(200).json(data)
           
        }
        catch(err){
            next(err)
        }

    }

    static async putHandler(req,res,next){
        try{
            const input = {
                name: req.body.name,
                image_url: req.body.image_url,
                price: req.body.price,
                stock: req.body.stock,
                category: req.body.category
            }
            const data = await Product.update(input,{where:{
                id:+req.params.id
            }})

            if(!data[0]){
                next({name: 'Not Found', message: 'Data not found!'})
            }
            else{
                res.status(200).json(await Product.findByPk(+req.params.id))
            }
        }   
        catch(err){
            next(err)
        }
    }

    static async deleteHandler(req,res,next){
        try{
            const data = await Product.destroy({where:{id:+req.params.id}})

            if(data){
                res.status(200).json({message: "Product success to delete"})
            } 
            else{
                next({name: 'Not Found', message: 'Data not found!'})
            }

        }
        catch(err){
            next(err)
        }
    }

}

module.exports = productController