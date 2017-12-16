var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Chat = mongoose.model('chat');
var Cate = mongoose.model('cate');
var Room = mongoose.model('room');

/* GET users listing. */
router.get('/',_fn.chkLogin,function(req, res, next) {

	console.log("sssss",req.session);
	var ff = "::ffff:";
	var client_ip = req.ip;
	var ipv6_client_ip = client_ip.replace(ff,"");
	req.session.ip = ipv6_client_ip;
	var error = 0;

	async.parallel({
		chat: function(callback){
			Chat.find({},function ( err, data, count ){
				if(err) return callback(null, error++);
				callback(null, data);
			});
		},
		cate: function(callback){
			Cate.find({},function ( err, data, count ){
				if(err) return callback(null, error++);
				callback(null, data);
			});
		},
		room: function(callback){

			Room.aggregate([
				{
					$group: {
						_id: '$room',
						count: {$sum: 1}
					}
				}
			], function (err, result) {
				console.log("group--",result);
				callback(null, result);
			});
		}
	}, function (err, result) {

		_.map(result.chat,function(val){
			_.map(result.room,function(g){
				if(val.id == g._id) val.count = g.count;
			})
			return val;
		})
		console.log("result.chat",result.chat);
		var obj = {
			title:_config.title,
			cate:result.cate,
			chat:result.chat,
			session:req.session
		}

		res.render('list',obj);
	});

});

/* GET users listing. */
router.get('/api/list',function(req, res, next) {

	console.log("sssss",req.session);
	var ff = "::ffff:";
	var client_ip = req.ip;
	var ipv6_client_ip = client_ip.replace(ff,"");
	req.session.ip = ipv6_client_ip;
	var error = 0;

	async.parallel({
		chat: function(callback){
			Chat.find({},function ( err, data, count ){
				if(err) return callback(null, error++);
				callback(null, data);
			});
		},
		cate: function(callback){
			Cate.find({},function ( err, data, count ){
				if(err) return callback(null, error++);
				callback(null, data);
			});
		},
		room: function(callback){

			Room.aggregate([
				{
					$group: {
						_id: '$room',
						count: {$sum: 1}
					}
				}
			], function (err, result) {
				console.log("group--",result);
				callback(null, result);
			});
		}
	}, function (err, result) {

		_.map(result.chat,function(val){
			_.map(result.room,function(g){
				if(val.id == g._id) val.count = g.count;
			})
			return val;
		})
		console.log("result.chat",result.chat);
		var obj = {
			title:_config.title,
			cate:result.cate,
			chat:result.chat,
			session:req.session
		}

		res.jsonp(obj);
	});

});



module.exports = router;

