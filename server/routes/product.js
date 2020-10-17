const route = require("express").Router()
const { ProductController } = require("../controllers/productController")
const { authentication, authorization } = require("../middleware/auth")


route.use(authentication)
route.get("/", ProductController.getAllProduct)
route.post("/", ProductController.postProduct)
route.put("/:id", authorization, ProductController.putProduct)
route.delete("/:id", authorization, ProductController.deleteProduct)

module.exports = route