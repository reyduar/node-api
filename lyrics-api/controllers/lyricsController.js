'use stritc'

function isAlive (req, res) {
	res.status(200).send({serverConnection: "is alive!!!"});
}

function addLyric (req, res){
	var params = req.body;
	res.status(200).send({body: params, method: "POST"});
}

function editLyrics (req, res){
	var id = req.params.id;
	var params = req.body;
	res.status(200).send({lyricId: id, body: params, method: "PUT"});
}

function deleteLyrics (req, res){
	var id = req.params.id;
	res.status(200).send({lyricId: id, method: "DETELE"});
	
}

function getAllLyrics (req, res){
	res.status(200).send({data: "lyrics list", method: "GET"});
}

function getLyricById (req, res){
	var id = req.params.id;
	res.status(200).send({lyricId: id, method: "GET"});
}


module.exports = {
	isAlive,
	getLyricById,
	addLyric,
	editLyrics,
	deleteLyrics,
	getAllLyrics
}