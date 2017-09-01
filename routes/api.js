var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var User = mongoose.model( 'user');
var Room = mongoose.model( 'room');
var Log = mongoose.model( 'log' );
var Cate = mongoose.model( 'cate');
var Chat = mongoose.model( 'chat');

router.post('/chat/create', function(req, res, next) {
	console.log("all:",req.body);
	var cateName 	= req.body.cateName;
	var obj = {
	    name    : req.body.name,
	    cate    : req.body.cate,
	    number  : req.body.number,
	    room    : req.body.room,
	    sex     : req.body.sex,
	    updated_at : Date.now()
	}
	Chat(obj).save( function( err, data, count ){
		if(err) return res.json({"err":err});
		res.json(data);
	});
});

router.get('/cate/create', function(req, res, next) {
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

router.get('/cate/find', function(req, res, next) {
	Cate.find( function( err, data, count ){
		if(err) return res.json({"err":err});
		res.json(data);
	});
});

router.post('/cate/update', function(req, res, next) {
	console.log("all:",req.body);
	var $cateName 	= req.body.cateName;
	var obj = {
		cateName   : $cateName
	}
	Cate.update({_id:req.body.id},obj,function( err, data, count ){
		if(err) return res.json({"err":err});
		res.json(data);
	});
	// res.json(req.body);
});

router.get('/room/create', function(req, res, next) {

	var data = {
		room:"成人聊天室",
		account:"arlen"
	}

	Room(data).save(function(err,user,count){
		if(err) return res.json({"err":err});
		res.json(user);
	});

});

router.get('/room', function(req, res, next){
	Room.find( function ( err, user, count ){
		if(err) return res.json({"err":err});
		res.json(user);
	});
});
router.get('/log', function(req, res, next) {
	Log.find( function ( err, user, count ){
		if(err) return res.json({"err":err});
		res.json(user);
	});
});

router.get('/logout', function(req, res, next) {
	req.session.destroy(function(err,data) {
		console.log("[destroy session]");
		res.redirect("/login");
	})

});

router.get('/login', function(req, res, next) {
	console.log("login",req.query);
	User.findOne({email:req.query.email,passwd:req.query.passwd},function( err, data ){
		console.log("dd",data);
		if(!data || err){
			console.log("kk",data);
			return res.jsonp({error:data});
		}
		req.session.user = data;
		res.jsonp({ok:data});
	});


});

module.exports = router;
