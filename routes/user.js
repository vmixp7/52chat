var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var User = mongoose.model( 'user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/find', function(req, res, next) {
	User.find( function ( err, user, count ){
		if(err) return res.json({"err":err});
		res.json(user);
	});
});

router.post('/create', function(req, res, next) {
	// console.log("req",req.body);
	// if(!req.body) return req.send(404);
	console.log("all:",req.body);
	var ff = "::ffff:";
	var client_ip = req.ip;
	var ipv6_client_ip = client_ip.replace(ff,"");
	console.log("ip:",ipv6_client_ip);

	req.body.ip = ipv6_client_ip;
	req.body.updated_at = Date.now();

	User(req.body).save( function( err, data, count ){

		if(err){
			return res.redirect('/register?error=1');
		}
		if(!data){
			return res.redirect('/register?error=1');
		}
		res.redirect('/login');
	});
});

router.post('/delete', function(req, res, next) {
	if(req.body.token != "2iuixigi") res.json({error:"you are not premission"});
	if(req.body.id == undefined) res.json({error:"no email"});

	var obj = {
		_id   : req.body.id
	}
	User.remove(obj,function( err, data, count ){
		if(err) return res.json({"err":err});
		res.json(data);
	});
});

router.post('/sigin', function(req, res, next) {
	console.log("all:",req.body);
	User.findOne(req.body,function( err, data ){
		console.log("dd",data);
		if(err) return res.json({"err":err});
		if(!data){
			var obj = {
				title:'Waitting U 聊天室',
				error:1
			}
			return res.render("login",obj);
		}
		req.session.user = data;
		res.redirect('/');
	});
});

router.post('/update', function(req, res, next) {
	if(req.body.id == undefined) res.json({error:"no id"});
	var uid = req.body.id;
	delete req.body.id;
	User.update({_id:uid},req.body,function( err, data, count ){
		if(err) return res.json({"err":err});
		res.json(data);
	});
});

module.exports = router;
