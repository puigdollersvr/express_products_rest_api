const express = require("express")
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express()

const { productRouter } = require("./routes")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(productRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404).send({error: true, status: 404, message: '404 Not Found'});
});

module.exports = app