const { connectTestDb, getTestDbUri, closeTestDb, clearTestDb } = require("./TestDatabase")
const { connection, connect } = require("./RealDatabase")

module.exports = { connectTestDb, getTestDbUri, closeTestDb, clearTestDb, connection, connect }