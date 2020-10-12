"use strict";

const router = require("express").Router();
const UsersController = require("../controllers/usersController");
const { authentication } = require("../middlewares/security");
const ProductsController = require("../controllers/productsController");

router.get("/", (req, res) => {
	res.send(`<h1>Hello World</h1>`);
});

router.post("/users/login", UsersController.login);

router.use(authentication);

router.post("/products", ProductsController.createOne);

module.exports = router;
