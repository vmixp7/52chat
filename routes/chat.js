var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Chat = mongoose.model( 'chat');
var Room = mongoose.model( 'room');

/* GET users listing. */
router.get('/:id',_fn.chkLogin, function(req, res, next) {
	console.log("sssss",req.session);
	var id = req.param("id");
	Chat.findOne({_id:id},function ( err, data, count ){
		if(err) return res.json({"err":err});
		var obj = {
			title:data.room,
			data:data,
			session:req.session
		}
		console.log("ffffff",obj);
		res.render('chat',obj);
	});

});

router.get('/api/find', function(req, res, next) {
	console.log("cccccc",req.session);
	Chat.find({}, function ( err, data, count ){
		if(err) return res.json({"err":err});
		console.log("bbb",data);
		res.jsonp(data);
	});
});

router.post('/create', function(req, res, next) {
	console.log("all:",req.body);
	var obj = {
		name   	: req.body.name,
		sex   	: req.body.sex,
		cate	: req.body.cate,
		room  	: req.body.room,
		number  : req.body.number,
		updated_at : Date.now()
	}
	Chat(obj).save( function( err, data, count ){
		if(err) return res.json({"err":err});
		req.session.user = data;
		var obj = {
			title:'Waitting U 聊天室',
			data:data
		}
		res.redirect('/chat/'+data._id);
	});
});

router.post('/delete', function(req, res, next) {
	console.log("all:",req.query);
	var room 	= req.body.room;
	var obj = {
		// room   : room
	}

	Chat.remove(obj,function( err, data, count ){
		if(err) return res.json({"err":err});
		res.json(data);
	});
});

router.get('/room/find', function(req, res, next) {
	console.log("cccccc",req.session);
	Chat.find({}, function ( err, data, count ){
		if(err) return res.json({"err":err});
		res.jsonp(data);
	});
});

module.exports = router;

