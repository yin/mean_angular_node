var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser');
    //mongoose = require('mongoose');

var cons = require('consolidate');
    
var MongoClient = require('mongodb').MongoClient;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path){
  return stylus(str).set('filename', path);
}


app.set('views',__dirname + '/server/views');
app.set('view engine', 'jade');


//app.engine('html', cons.swig)
//app.set('views',__dirname + '/server/views');
//app.set('view engine', 'html');


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



var mongoMessage;


MongoClient.connect("mongodb://localhost:27017/mean", function (err, db) {
   
  if(err) throw err;
    
       
  db.collection('Persons', function (err, collection) {
           
    collection.insert({ id: 1, firstName: 'Steve', lastName: 'Jobs' });
    collection.insert({ id: 2, firstName: 'Bill', lastName: 'Gates' });
    collection.insert({ id: 3, firstName: 'James', lastName: 'Bond' });
      
  });   
         
 
  db.collection('Persons').count(function (err, count) {
    if (err) throw err;             
    console.log('Total Rows: ' + count);
  });
         
         
  db.collection('Persons', function (err, collection) {
         
    collection.update({id: 1}, { $set: { firstName: 'James', lastName: 'Gosling'} }, {w:1}, function(err, result){
      if(err) throw err;    
      console.log('Document Updated Successfully');
    });
  
  });
  
  
  db.collection('Persons', function (err, collection) {
    
    collection.remove({id:2}, {w:1}, function(err, result) {        
        if(err) throw err;            
        console.log('Document Removed Successfully');
    });
    
  });
    
    
  db.collection('Persons', function (err, collection) {
        
    collection.find().toArray(function(err, items) {
        if(err) throw err;    
        console.log(items);
        mongoMessage = items.length;            
    });
        
  });
         
     
                
});




/*
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
/*
Person.count({},function(err, msg) {
  if (err) throw err;

  // object of all the users
  console.log(msg);
  mongoMessage = msg;
});
*/

/*
db.collection('userdetails').find({},function(err, docs) {
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