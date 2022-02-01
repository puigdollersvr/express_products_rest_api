module.exports.Builder = {
    product: ({
        sku = '0001',    
        name = "Test product",
        description = "this is a test",
        price = 50,
        category = "Home Office",
        stock = 1
    } = {}) => ({
        sku,
        name,
        description,
        price,
        category,
        stock
    }),
}