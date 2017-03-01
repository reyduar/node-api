'use stritc'

var Lyric = require('../models/lyric');


function welcome (req, res) {
	res.status(200).send({
		message: "Welcome to Death Lyric Api",
		author: "By Ariel Duarte (c)2017",
		backEnd: "Node.js",
		endpoint:["IsAlive => /api/isAlive", "Find by Id => /api/lyric/:id", "Find All => /api/lyrics", "Add a new lyric => /api/lyric/add", "Edit lyric => /api/lyric/edit/:id", "Delete lyric => /api/lyric/delete/:id"]});
}

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
	welcome,
	isAlive,
	getLyricById,
	addLyric,
	editLyrics,
	deleteLyrics,
	getAllLyrics
}
