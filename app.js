'use stritc'

var express = require("express");
var bodyParser = require('body-parser')
var app = express();

var lyric_routers = require('./routers/lyricsRoute');
var user_routers = require('./routers/userRoute');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Config HTTP HEAD (Cors, Method)
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PUT');
	res.header('Allow', 'GET, POST, OPTIONS, DELETE, PUT');
	next();
});

app.use('/api', lyric_routers);
app.use('/api', user_routers);

module.exports = app;
