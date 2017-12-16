var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Cate = mongoose.model( 'cate');

/* GET users listing. */
router.get('/',_fn.chkLogin, function(req, res, next) {

  	Cate.find( function ( err, data, count ){
		if(err) return res.json({"err":err});
		console.log("data:",data);
		var obj = {
			title:_config.title,
			data:data
		}
		res.render('myroom',obj);
	});

});

module.exports = router;
