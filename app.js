'use stritc'

var express = require("express");
var bodyParser = require('body-parser')
var app = express();

app.use(express.static(__dirname));

var router = require('./routers/lyricsRoute');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Config HTTP HEAD (Cors, Method)
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PUT');
	res.header('Allow', 'GET, POST, OPTIONS, DELETE, PUT');
	next();
});

app.use('/api', router);

module.exports = app;
