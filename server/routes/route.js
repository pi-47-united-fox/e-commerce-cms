const Controller = require("../controllers/controller")
const ProductController = require("../controllers/productController")
const {authentication, authorization} = require("../middlewares/auth")
const errorHandler = require("../middlewares/errorHandler")
const router = require("express").Router()

router.post("/login", Controller.postLogin)
router.use(authentication)
router.post("/product", ProductController.postProduct)
router.get("/products", ProductController.getProducts)
router.use(authorization)
router.put("/product/:id", ProductController.putProduct)
router.delete("/product/:id", ProductController.deleteProduct)
router.use(errorHandler)

module.exports = router