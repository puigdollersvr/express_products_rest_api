const express = require("express")

const { 
      apiShowAllProducts, 
      apiCreateProduct, 
      apiGetProductById, 
      apiFindProducts, 
      apiShowProduct, 
      apiUpdateProduct, 
      apiUpdateProductById, 
      apiDeleteProduct, 
      apiDeleteProductById 
} = require("../controllers/ProductController")

const productRouter = express.Router()

productRouter.get("/products", apiShowAllProducts)
      .post("/products", apiCreateProduct)
      .get('/products/:id', apiGetProductById)
      .get('/products/:key/:value', apiFindProducts, apiShowProduct)
      .put('/products/:id', apiUpdateProductById)
      .put('/products/:key/:value', apiFindProducts, apiUpdateProduct)
      .delete('/products/:id', apiDeleteProductById)
      .delete('/products/:key/:value', apiFindProducts, apiDeleteProduct)

module.exports.productRouter = productRouter