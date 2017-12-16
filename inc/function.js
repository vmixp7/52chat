// var express = require('express');
// var router = express.Router();
// var mongoose = require( 'mongoose' );
// var Cate = mongoose.model( 'cate');

var obj = {
	chkLogin:function (req, res, next) {

		if(req.session.user) {
			return next();
		}else{
			res.redirect("/login");
		}

	},
	chkAjax:function (req, res, next) {
		console.log("xhr",req.xhr);
		if (req.xhr){
			return next();
		}else if(!req.xhr && req.query.token == "2iuixigi"){
			return next();
		}else{
			return res.json({error:3001});//檢查web是不是ajax
		}
	}

}

module.exports = obj;
