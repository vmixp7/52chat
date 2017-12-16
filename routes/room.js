var express = require('express');
var router = express.Router();
require( '../db' );
mongoose.model( 'room', room );
var Room = connection.model('room');

router.get('/find', function(req, res, next){
	Room.find( function ( err, user, count ){
		if(err) return res.json({"err":err});
		res.json(user);
	});
});
router.post('/api/delete',_fn.chkAjax, function(req, res, next){
	Room.remove({_id:req.body.id}, function ( err, user, count ){
		if(err) return res.json({"err":err});
		res.json(user);
	});
});

module.exports = router;
