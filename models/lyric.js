'use stritc'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LyricSchema = Schema({
	name: String,
	artist: String,
	album: String,
	year: Number,
	country: String,
	lyricOrig: String,
	lyricTrans: String
});

module.exports = mongoose.model('Lyric', LyricSchema);