const Product = require('../models/Product')

/**
 * Show all products
 */
async function showAllProducts() {
    const allProducts = await Product.find({})
    return allProducts
}

/**
 * Create new product
 */
async function createProduct(product) {
    let newProduct = new Product(product)
    newProduct = await newProduct.save()
    return newProduct
}

/**
 * Update product
 */
async function updateProduct(product, reqBody) {
    let updatedProduct = product
    updatedProduct = Object.assign(updatedProduct, reqBody)
    updatedProduct = await updatedProduct.save()
    return updatedProduct
}

/**
 * Update product by ID
 */
 async function updateProductById(id, reqBody) {
    let updatedProduct = await Product.findById(id)
    updatedProduct = Object.assign(updatedProduct, reqBody)
    updatedProduct = await updatedProduct.save()
    return updatedProduct
}

/**
 * Remove product
 */
async function deleteProduct(product) {
    let removedProduct = new Product(product)
    removedProduct = await removedProduct.remove()
    return removedProduct
}

/**
 * Find products by key and value
 */
async function findProducts(key, value) {
        let query = {}
        query[key] = value
        const products = await Product.find(query)
        return products
}

module.exports = {
    showAllProducts,
    createProduct,
    updateProduct,
    updateProductById,
    deleteProduct,
    findProducts
}