'use stritc'

var Lyric = require('../models/lyric');
function isAlive (req, res) {
	res.status(200).send({serverConnection: "is alive!!!"});
}

function addLyric (req, res){
	var params = req.body;
	var lyric = new Lyric();
	lyric.name = params.name;
	lyric.artist = params.artist;
	lyric.album = params.album;
	lyric.year = params.year;
	lyric.country = params.country;
	lyric.lyricOrig = params.lyricOrig;
	lyric.lyricTrans = params.lyricTrans;
	lyric.save((err, lyricStored) => {
		if(err){
			res.status(500).send({message: "Error to add new lyric"});
		}else{
			res.status(200).send({message: "Success to add new lyric", lyric: lyricStored});
		}
	});
}

function editLyrics (req, res){
	var id = req.params.id;
	var params = req.body;
	Lyric.findByIdAndUpdate(id, params, (err, lyricUpdated) => {
		if(err){
			res.status(500).send({message: "Error to update lyric", lyricId: id});
		}else{
			res.status(200).send({message: "Success to update lyric", lyric: lyricUpdated});
		}
	});
}

function deleteLyrics (req, res){
	var id = req.params.id;
	Lyric.findById(id, (err, lyric) => {
		if(err){
			res.status(500).send({message: "Error to get lyric", lyricId: id});
		}
		if(!lyric){
			res.status(404).send({message: "No found"});
		}else{
			lyric.remove(err => {
				if(err){
					res.status(500).send({message: "Error to delete lyric", lyricId: id});
				}else{
					res.status(200).send({message: "Success to delete lyric", lyric: lyric});
				}
			});
		}
	});
	
}

function getAllLyrics (req, res){
	Lyric.find({}).sort('artist').exec((err, lyrics) => {
		if(err){
			res.status(500).send({message: "Error to get all lyrics"});
		}else{
			if(!lyrics){
				res.status(404).send({message: "Empty lyrics collection"});
			}else{
				res.status(200).send({lyrics: lyrics});
			}
		}
	});
}

function getLyricById (req, res){
	var id = req.params.id;
	Lyric.findById(id, (err, lyric) => {
		if(err){
			res.status(500).send({message: "Error to get lyric", lyricId: id});
		}else{
			if(!lyric){
				res.status(404).send({message: "No found"});
			}else{
				res.status(200).send({lyric: lyric});
			}
		}
	});
}

module.exports = {
	isAlive,
	getLyricById,
	addLyric,
	editLyrics,
	deleteLyrics,
	getAllLyrics
}