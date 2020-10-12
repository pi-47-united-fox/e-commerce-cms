"use strict";

const { Product } = require("../models");

class ProductsController {
	static createOne(req, res, next) {
		const productData = {
			name: req.body.name,
			img_url: req.body.img_url,
			price: +req.body.price || 0,
			stock: +req.body.stock || 0,
			CategoryId: +req.body.CategoryId || 0,
		};

		Product.create(productData)
			.then(({ id, name }) => {
				res.status(201).json({ id, name });
			})
			.catch((err) => {
				next(err);
			});
	}
}

module.exports = ProductsController;
