const express = require("express")

const { apiShowAllProducts, apiCreateProduct, apiFindProducts, apiShowProduct, apiUpdateProduct, apiUpdateProductById, apiDeleteProduct } = require("../controllers/ProductController")

const productRouter = express.Router()

productRouter.get("/products", apiShowAllProducts)
      .post("/products", apiCreateProduct)
      .get('/products/:key/:value', apiFindProducts, apiShowProduct)
      .put('/products/:id', apiUpdateProductById)
      .put('/products/:key/:value', apiFindProducts, apiUpdateProduct)
      .delete('/products/:key/:value', apiFindProducts, apiDeleteProduct)

module.exports.productRouter = productRouter