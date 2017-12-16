var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );

/* GET users listing. */
router.get('/', function(req, res, next) {

		var obj = {
			title:_config.title,
			req : req
		}
		res.render('register',obj);

});

module.exports = router;
