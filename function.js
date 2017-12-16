// var express = require('express');
// var router = express.Router();
// var mongoose = require( 'mongoose' );
// var Cate = mongoose.model( 'cate');

var obj = {
	police:function (req, res, next) {
	  if (req.session.user) {
		next();
	  } else {
		res.redirect("/login");
	  }
	}

}

module.exports = obj;
