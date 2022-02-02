const { showAllProducts, createProduct, updateProduct, updateProductById, deleteProduct, findProducts } = require("../services/ProductService")
const { setError } = require('./ErrorController')

/**
 * Get all products
 */
async function apiShowAllProducts(req, res) {
  
  try {
    const products = await showAllProducts()
    
    if (products.length) {
      return res.status(200).json({products})
    } 

    return setError(res, 204)

  } catch (error) {
      return setError(res, 500, error)
  }
}

/**
 * Create new product
 */
 async function apiCreateProduct(req, res) {

  try {
      const product = await createProduct(req.body)
      const { _id, sku, name, description, price, category, stock } = product
      return res.status(201).json({_id, sku, name, description, price, category, stock})

  } catch (error) {
      return setError(res, 500, error)
  }
}

/**
 * Search product
 */
 async function apiShowProduct(req, res, next){
    
    if(req.body.error){
      return setError(res, 500, error)
    }

    if(!req.body.products){
      return setError(res, 404)
    }
    
    let products = req.body.products;
    return res.status(200).json({products})
}

/**
 * Update product
 */
 async function apiUpdateProduct(req, res) {
  try {

    if(req.body.error){
      return setError(res, 500, error)
    }

    if(!req.body.products){
      return setError(res, 404)
    }

    const product = await updateProduct(req.body.products[0], req.body)

    const { _id, sku, name, description, price, category, stock } = product
    return res.status(200).json({_id, sku, name, description, price, category, stock})
      
  } catch (error) {
      return setError(res, 500, error)
  }
}

/**
 * Update product by ID
 */
 async function apiUpdateProductById(req, res) {
  try {

    const product = await updateProductById(req.params.id, req.body)
    const { _id, sku, name, description, price, category, stock } = product
    return res.status(200).json({_id, sku, name, description, price, category, stock})
      
  } catch (error) {
      return setError(res, 500, error)
  }
}

/**
 * Delete found product
 */
 async function apiDeleteProduct(req, res) {

  try {
    if(req.body.error){
      return setError(res, 500, error)
    }
  
    if(!req.body.products){
      return setError(res, 404)
    }

    const product = await deleteProduct(req.body.products[0])

    const { _id, sku, name, description, price, category, stock } = product
    return res.status(200).json({_id, sku, name, description, price, category, stock})

  } catch (error) {
      return setError(res, 500, error)
  }
}

/**
 * Find product
 */
async function apiFindProducts(req, res, next) {

  try {
      const products = await findProducts(req.params.key, req.params.value)
      
      if(!products.length){
        return next()
      } 
      
      req.body.products = products
      return next()

  } catch (error) {
      req.body.error = error
      return next()
  }
}

module.exports = {
  apiShowAllProducts,
  apiCreateProduct,
  apiShowProduct,
  apiUpdateProduct,
  apiUpdateProductById,
  apiDeleteProduct,
  apiFindProducts
}