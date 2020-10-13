"use strict";

const { Product, Category } = require("../models");

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

	static getAll(req, res, next) {
		Product.findAll({
			include: {
				model: Category,
				attributes: ["name"],
			},
		})
			.then((results) => {
				results = results.map((el) => {
					const { id, name, img_url, price, stock, Category } = el;
					return { id, name, img_url, price, stock, category_name: Category.name };
				});
				res.status(200).json(results);
			})
			.catch((err) => {
				next(err);
			});
	}

	static UpdateOne(req, res, next) {
		const productData = {
			name: req.body.name,
			img_url: req.body.img_url,
			price: +req.body.price || 0,
			stock: +req.body.stock || 0,
			CategoryId: +req.body.CategoryId || 0,
		};

		Product.update(productData, { where: { id: req.params.id } })
			.then((result) => {
				if (result[0]) {
					return Product.findOne({
						where: { id: req.params.id },
						include: {
							model: Category,
							attributes: ["name"],
						},
					});
				} else {
					next({ name: "NotFound", message: "Product is not Found" });
				}
			})
			.then(({ id, name, img_url, price, stock, Category }) => {
				res.status(200).json({
					id,
					name,
					img_url,
					price,
					stock,
					category_name: Category.name,
				});
			})
			.catch((err) => {
				next(err);
			});
	}
}

module.exports = ProductsController;
