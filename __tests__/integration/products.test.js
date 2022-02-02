const request = require("supertest")

const app = require("../../app")

const { Builder } = require("../../builders")
const { connectTestDb, getTestDbUri, closeTestDb, clearTestDb } = require("../../db")
const { createProduct } = require("../../services/ProductService")

beforeAll(async () => {
  const uri = await getTestDbUri()
  await connectTestDb({ uri })
})

beforeEach(async () => await clearTestDb())

afterAll(async () => {
  await closeTestDb()
})

describe('Product Service', function() {

  describe("POST /products: Add new product", () => {
    test("When product is added we should get the following: 201 code, valid object of the created product and a valid _id", async () => {
      
      //Arrange
      
      const product = Builder.product()

      //Act

      const response = await request(app)
        .post("/products")
        .send(product)
        .set("Accept", "application/json")

        //Assert

        .expect("Content-Type", /json/)
        .expect(201)
    
      const { _id, ...productStored } = response.body
      
      expect(productStored).toEqual(product)
      expect(_id).toBeTruthy()
    })
    
  })

  describe("GET /products: Get all products", () => {
    test("When products are listed we should get a 200 code and an array of products", async () => {
      
      //Arrange
      
      const product = Builder.product()
      createProduct(product)
    

      //Act

      const response = await request(app)
        .get("/products")
        //Assert
        .expect("Content-Type", /json/)
        .expect(200)
        
    })
  })

  describe("GET /products/:id: Find a product by ID", () => {
    test("When a product is found we should get a 200 code and the object of the product", async () => {
      
      //Arrange
      
      const product = Builder.product()
      const createdProduct = await createProduct(product)
    

      //Act

      const response = await request(app)
        .get("/products/"+createdProduct._id)
        //Assert
        .expect("Content-Type", /json/)
        .expect(200)
      
      const { _id } = response.body.product
      expect(response.body.product).toBeDefined();
      expect(_id).toBeTruthy()
        
    })
  })

  describe("GET /products/:key/:value: Find a product", () => {
    test("When products are found we should get a 200 code and the object of the product", async () => {
      
      //Arrange
      
      const product = Builder.product()
      createProduct(product)
    

      //Act

      const response = await request(app)
        .get("/products/sku/0001")
        //Assert
        .expect("Content-Type", /json/)
        .expect(200)
        
    })
  })

  describe("PUT /products/:key/:value: Update a product", () => {
    test("When product is updated we should get the following: 200 code, valid object of the created product and a valid _id", async () => {
      
      //Arrange
      
      const product = Builder.product()
      createProduct(product)

      //Act

      const response = await request(app)
        .put("/products/sku/0001")
        .send(product)
        .set("Accept", "application/json")

        //Assert

        .expect("Content-Type", /json/)
        .expect(200)
    
      const { _id, ...productStored } = response.body
      
      expect(productStored).toEqual(product)
      expect(_id).toBeTruthy()
    })
    
  })

  describe("PUT /products/:id: Update a product by ID", () => {
    test("When product is updated by its _id we should get the following: 200 code, valid object of the created product and a valid _id", async () => {
      
      //Arrange
      
      const product = Builder.product()
      const newProduct = await createProduct(product)

      //Act

      const response = await request(app)
        .put("/products/"+newProduct._id)
        .send(product)
        .set("Accept", "application/json")

        //Assert

        .expect("Content-Type", /json/)
        .expect(200)
    
      const { _id, ...productStored } = response.body
      
      expect(productStored).toEqual(product)
      expect(_id).toBeTruthy()
    })
    
  })

  describe("DELETE /products/:key/:value: Delete a product", () => {
    test("When product is deleted we should get the following: 200 code, valid object of the created product and a valid _id", async () => {
      
      //Arrange
      
      const product = Builder.product()
      createProduct(product)

      //Act

      const response = await request(app)
        .delete("/products/sku/0001")
        .send(product)
        .set("Accept", "application/json")

        //Assert

        .expect("Content-Type", /json/)
        .expect(200)
    
      const { _id, ...productStored } = response.body
      
      expect(productStored).toEqual(product)
      expect(_id).toBeTruthy()
    })
    
  })
  
  describe("DELETE /products/:id Delete a product by ID", () => {
    test("When product is deleted we should get the following: 200 code, valid object of the created product and a valid _id", async () => {
      
      //Arrange
      
      const product = Builder.product()
      const createdProduct = await createProduct(product)

      //Act

      const response = await request(app)
        .delete("/products/"+createdProduct._id)
        .send(product)
        .set("Accept", "application/json")

        //Assert

        .expect("Content-Type", /json/)
        .expect(200)
    
      const { _id, ...productStored } = response.body
      
      expect(productStored).toEqual(product)
      expect(_id).toBeTruthy()
    })
    
  })
  

})