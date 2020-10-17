const { Product, Category } = require('../models');

class AdminController {
    // @todo menambah category
    static addProductC(req, res, next) {
        if(req.body.categoryName === '') {
            req.body.categoryName = 'Uncategorized'
        }
        Category.findOne({
            where: {
                categoryName: req.body.categoryName
            }
        }).then (result => {
            if (result) {
                return result
            } else {
                return Category.create({
                    categoryName: req.body.categoryName
                })
            }
        }).then (category => {
            console.log ('masuk Product Create', category)
            return Product.create({
                name: req.body.name,
                image_url: req.body.image_url,
                price: +req.body.price,
                stock: +req.body.stock,
                CategoryId: category.id
            }/*, { include: [Category]}*/) //include tidak bisa
        }).then((result) => {
            // console.log ('Selesai Add', result)
            return Product.findByPk(result.id, {
                include: [Category]
            })
        }).then(result =>{
            return res.status(201).json(result)
        }).catch((err) => {
            console.log(err)
            next(err)
        });
    }

    static getAllProductC (req, res, next) {
        Product.findAll({
            include: [Category]
        }).then((result) => {
            return res.status(200).json(result)
        }).catch((err) => {
            next(err)
        });
    }

    // @audit mungkin getOneProductC ini diganti di getter client - tanpa hit API
    static getOneProductC (req, res, next) {
        Product.findByPk(+req.params.id, {
            include: [Category]
        }).then((result) => {
            if (result === null) {
                return next({
                    name: 'not found'
                })
            } else {
                return res.status(200).json(result)
            }
        }).catch((err) => {
            return next(err)
        });
    }

    // @todo Update category
    static updateProductC (req, res, next) {
        console.log ('masuk', req.body)
        Category.findOne({
            where: {
                categoryName: req.body.categoryName
            }
        }).then (result => {
            console.log ('selesai find category: ', result)
            if (result) {
                return result
            } else {
                return Category.create({
                    categoryName: req.params.categoryName
                })
            }
        }).then (category => {
            // console.log ('selesai urusan category:', category)
            return Product.update({
                name: req.body.name,
                image_url: req.body.image_url,
                price: +req.body.price,
                stock: +req.body.stock,
                CategoryId: category.id
            }, {
                where: {
                    id: +req.params.id
                },
                returning: true,
                include: ['Category']
            })
        }).then((result) => {
            /**
             * @result tidak returning accosiationnya
             */
            console.log ('selesai product: ', result)
            if (result[1].length == 0) {
                return next({
                    name: 'not found'
                })
            } else {
                return res.status(200).json(result[1][0])
            }
        }).catch((err) => {
            console.log ('masuk error ternyata', err)
            return next(err)
        });
    }

    static deleteOneProductC (req, res, next) {
        Product.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            if (result == 1) {
                return res.status(200).json({
                    message: 'Product: success deleted'
                })
            } else {
                return next({ name: 'not found' })
            }
        }).catch((err) => {
            next(err)
        });
    }
}

module.exports = AdminController