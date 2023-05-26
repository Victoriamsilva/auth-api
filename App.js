

const express = require('express');
require("dotenv-safe").config();
const app = express();

app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, x-access-token');

    next();
});

const routeUser = require('./routes/user');
app.use('/', routeUser)
app.listen(3100)
console.log('API rodando na porta 3100')

module.exports = app;
