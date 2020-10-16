"use strict";

const router = require("express").Router();
const UsersController = require("../controllers/usersController");
const { authentication, authorization } = require("../middlewares/security");
const ProductsController = require("../controllers/productsController");
const BannersController = require("../controllers/bannersController");

router.get("/", (req, res) => {
	res.send(`<h1>Hello World</h1>`);
});

router.post("/users/login", UsersController.login);

router.use(authentication);

router.get("/products", ProductsController.getAll);
router.post("/products", authorization, ProductsController.createOne);
router.put("/products/:id", authorization, ProductsController.UpdateOne);
router.delete("/products/:id", authorization, ProductsController.deleteOne);

router.get("/banners", BannersController.getAll);
router.post("/banners", authorization, BannersController.createOne);
router.patch("/banners/:id", authorization, BannersController.changeActive);
router.delete("/banners/:id", authorization, BannersController.deleteOne);

module.exports = router;
