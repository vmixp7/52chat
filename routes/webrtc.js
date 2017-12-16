var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );

/* GET users listing. */
router.get('/', function(req, res, next) {

		var obj = {
			title:'Waitting U 聊天室',
			req : req
		}
		res.render('webrtc',obj);

});

module.exports = router;
