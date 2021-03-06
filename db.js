var mongoose = require( 'mongoose' );


var log = new Schema({
    account    	: String,
    ip     		: String,
    updated_at 	: Date
});

var room = new Schema({
	room    	: String,
	email    	: String,
	name		: String,
	ip    		: String,
    updated_at 	: Date
});

var chat = new Schema({
    name    : String,
    cate    : String,
    number  : Number,
    room    : String,
    sex     : String,
    updated_at : Date
});

var cate = new Schema({
	cateName   	: String,
    updated_at 	: Date
});

mongoose.model( 'user', user );
mongoose.model( 'log', log );
mongoose.model( 'room', room );
mongoose.model( 'cate', cate );
mongoose.model( 'chat', chat );

mongoose.Promise = global.Promise;





// mongoose.connect( 'mongodb://arlen:2iuixigi@localhost:27017/chat_db' );
