const express = require('express')
const app = express()
const bodyParser = require('body-parser')
//require('dotenv').load()
//const port = process.env.PORT || 8088
const port = 8088;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
    //res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let routes = require('./api/routes') //importing route
routes(app)

app.listen(port)
console.log('RESTful API server started on: ' + port)