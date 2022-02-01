const mongoose = require("mongoose")
const { MongoMemoryServer } = require("mongodb-memory-server")

mongoose.Promise = Promise

let mongoServer = MongoMemoryServer

//Get DB URI
async function getTestDbUri() {
    if (process.env.NODE_ENV === "test") {
        mongoServer = await MongoMemoryServer.create()
        return mongoServer.getUri()
    }

    return process.env.DB_URI
}

//Connect to the DB
async function connectTestDb({ uri }) {
    const mongooseOpts = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  
    await mongoose.connect(uri, mongooseOpts)
  
    mongoose.connection.once("open", () => {
      console.log(`MongoDB successfully connected to ${uri}`)
    })
}

/*
 * Close DB
 */
async function closeTestDb() {
    await mongoose.disconnect()
  
    if (process.env.NODE_ENV === "test") {
        await mongoServer.stop()
    }
}

/*
 * Remove all data from collections
 */
async function clearTestDb() {
    const collections = mongoose.connection.collections
  
    for (const key in collections) {
      await collections[key].deleteMany()
    }
}

module.exports = { connectTestDb, getTestDbUri, closeTestDb, clearTestDb }
  