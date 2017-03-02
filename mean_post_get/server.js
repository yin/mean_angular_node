var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

//var $ = jQuery = require('jquery')(window);

var cors = require('cors');

var MongoClient = require('mongodb').MongoClient;


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




var app = express();

app.use(cors());
//app.use(bodyParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//app.use( express.static( __dirname + '/public' ));
app.use( express.static( __dirname + '/public'));



//app.use('/node_modules', express.static(__dirname + '/node_modules/'));
//app.use('/node_modules', express.static('node_modules'));
app.use( express.static( __dirname + '/node_modules'));


app.get('*',function(req, res){
       
     //res.sendFile( __dirname + "/" + "index.html" );
     res.sendFile( __dirname + '/public/index.html' );
});

/*
app.get('/city',function(req, res){
       
     //res.sendFile( __dirname + "/" + "index.html" );
     res.sendFile( __dirname + '/public/index.html' );
});
*/





app.post('/add',function(req, res){
  var thing = req.body.thingInput;
  //var thingDoc = new thingModel({thing: thing});
  console.log(thing);
  
  res.setHeader('content-type', 'application/json');
  res.json({ a: 1 });
  //res.send(thing);
  /*thing.Doc.save(function(){
    res.send();
  });*/
});


app.post('/townAdd',function(req, res){
  var tic = req.body.townItemClient;

  console.log(tic);
  
  res.setHeader('content-type', 'application/json');
  res.json({ townA: 'server town response' });

});



app.post('/addRecord',function(req, res){
  var recordAddClient = req.body.recordAddClient;

  console.log(recordAddClient);
  
  res.setHeader('content-type', 'application/json');
  res.json({ 'responseAddRecord': 'lllll' });

});



var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening on port' + port + '...' + __dirname );