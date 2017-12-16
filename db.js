var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var user = new Schema({
    name: String,
    sex : String,
    email: {type: String,required: true,unique: true},
    passwd: String,
    ip: String,
    updated_at: Date
});

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


mongoose.Promise = global.Promise;
// mongoose.connect( 'mongodb://arlen:2iuixigi@localhost:27017/chat_db' );
var promise = mongoose.createConnection('mongodb://localhost:27017/chat_db', {
  useMongoClient: true,
});
promise.then(function(db) {
  console.log('connect db ok');
  db.model( 'user', user );
  db.model( 'log', log );
  db.model( 'room', room );
  db.model( 'cate', cate );
  db.model( 'chat', chat );
//   /* Use `db`, for instance `db.model()`
  // console.log('okkkk',db);
});
// Or, if you already have a connection
// connection.openUri('mongodb://localhost/myapp', { /* options */
// });
// mongoose.connect( 'mongodb://arlen:2iuixigi@localhost:27017/chat_db' );
