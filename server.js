var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path){
  return stylus(str).set('filename', path);
}

app.set('views',__dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
//app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(stylus.middleware(
  {
    src: __dirname + '/public',
    compile: compile
  }
));
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/mean');
var db = mongoose.connection;
db.on('error',console.error.bind(console,' error mongoose ...'));
db.once('open', function callback(){
  console.log(' ok mongoose ... db opened');
});

var Schema = mongoose.Schema;
var personSchema = new Schema({
  name: String
});

var Person = mongoose.model('Person', personSchema);
var mongoMessage = 'oooooo';

Person.count({},function(err, msg) {
  if (err) throw err;

  // object of all the users
  console.log(msg);
  mongoMessage = msg;
});

/*
db.collection('person').find({},function(err, docs) {
    console.log(docs);
}); 
*/


/*
Person.findOne().exec(function(err, messageDoc){
  mongoMessage = messageDoc.name;
});
*/

app.get('/partials/:partialPath', function(req,res){
  res.render('partials/' + req.params.partialPath);
});

app.get('*', function(req, res){
  res.render('index',{
    mongoMessage: mongoMessage
  });
});

var port = 3030;
app.listen(port);
console.log('Listening on port' + port + '...');