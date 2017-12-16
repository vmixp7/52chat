var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Cate = mongoose.model( 'cate');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('cate',{ title: 'Waitting U 聊天室' });
});

router.get('/find', function(req, res, next) {
	Cate.find( function ( err, data, count ){
		if(err) return res.json({"err":err});
		res.json(data);
	});
});

router.post('/create', function(req, res, next) {
	console.log("all:",req.body);
	var cateName 	= req.body.cateName;
	var obj = {
		cateName   : cateName,
		updated_at : Date.now()
	}
	Cate(obj).save( function( err, data, count ){
		if(err) return res.json({"err":err});
		res.json(data);
	});
});

router.post('/delete', function(req, res, next) {
	console.log("all:",req.query);
	var cateName 	= req.body.cateName;
	var obj = {
		cateName   : cateName
	}

	Cate.remove(obj,function( err, data, count ){
		if(err) return res.json({"err":err});
		res.json(data);
	});
});

module.exports = router;
