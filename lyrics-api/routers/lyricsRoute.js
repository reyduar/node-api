'use stritc'

var express = require('express');
var lyricsController = require('../controllers/lyricsController');
var router = express.Router();

// Route for test is alive server
router.get('/isAlive', lyricsController.isAlive);

//Route for get lyric by Id
router.get('/lyric/:id', lyricsController.getLyricById);

//Route for add lyric
router.post('/lyric/add', lyricsController.addLyric);

//Route for edit lyric
router.put('/lyric/edit/:id', lyricsController.editLyrics);

//Route for delete lyric
router.delete('/lyric/delete/:id', lyricsController.deleteLyrics);

//Route for delete lyric
router.get('/lyrics', lyricsController.getAllLyrics);

module.exports = router;