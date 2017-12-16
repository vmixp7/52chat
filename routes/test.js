var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Cate = mongoose.model( 'cate');

/* GET users listing. */
router.get('/', function(req, res, next) {

	var obj = {
		title:'Waitting U 聊天室',
		req:req
	}
	res.render('test',obj);

});

module.exports = router;
