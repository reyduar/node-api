'use stritc'
var express = require("express");
var bodyParser = require('body-parser')
var app = express();
var router = require('./routers/lyricsRoute');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', router);

module.exports = app;