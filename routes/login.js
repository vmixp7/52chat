var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Cate = mongoose.model( 'cate');

/* GET users listing. */
router.get('/', function(req, res, next) {

	var obj = {
		title:_config.title,
		error:0
	}
	res.render('login',obj);

});

module.exports = router;
