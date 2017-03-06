var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

//var $ = jQuery = require('jquery')(window);

var cors = require('cors');

var Promise = require("native-promise-only");

var p = new Promise(function(resolve,reject){
    var a = "aaaaaaaaaaaaaaa11111";
    //setTimeout(function(){
        resolve(a);
    //},5000);
});

var p1 = new Promise(function(resolve,reject){
    var a = "oooookkkkk";
    setTimeout(function(){      
        resolve(a);
    },5000);
});

var p3 = function(){
   return 'bbb';
}

p.then(function(msg){
    console.log(msg); // Yay!
}).then(function(){
    console.log('aaaaa222222'); // Yay!
}).then(function(){
    console.log(p3());
});

p1.then(function(jj){console.log(jj);});



var MongoClient = require('mongodb').MongoClient;

var colectionMongoDb = 'Record';







var addRecordMongo = function(collectionName,record){
  
    MongoClient.connect("mongodb://localhost:27017/mean", function (err, db) {
     
	if(err) throw err;
            
	db.collection(collectionName, function (err, collection) {
	    collection.insert({ item: record }, function(err, r) {
		db.close();	
	    });
	});
    });  
}




function getRecordMongo(collectionName){
  
  MongoClient.connect("mongodb://localhost:27017/mean", function (err, db) {
     
    if(err) throw err;
            
    db.collection('Record', function (err, collection) {
      collection.find().toArray(function(err, items) {
        if(err) throw err;
        console.log('service items from mongodb '+items);
        
        setTimeout(function(){ 
          return items;
        },5000);
        db.close();
        /*
        res.setHeader('content-type', 'application/json');      
        res.json({ 'responseAction': result });
        */
      });
    });
  }); 
  

  
  //db.collection('Record', function (err, collection) {
  //     
  //     collection.find().toArray(function(err, items) {
  //         if(err) throw err;    
  //         console.log(items);
  //         mongoMessage = items.length;            
  //     });
  //     
  //   });
}





// MongoClient.connect("mongodb://localhost:27017/mean", function (err, db) {
//    
//   if(err) throw err;
//     
//        
//   db.collection('Record', function (err, collection) {
//           
//     collection.insert({ id: 1, firstName: 'Steve', lastName: 'Jobs' });
//     collection.insert({ id: 2, firstName: 'Bill', lastName: 'Gates' });
//     collection.insert({ id: 3, firstName: 'James', lastName: 'Bond' });
//      
//   });   
//          
//  
//   db.collection('Record').count(function (err, count) {
//     
//     if (err) throw err;             
//     console.log('Total Rows: ' + count);
//     
//   });
//          
//          
//   db.collection('Record', function (err, collection) {
//     
//     collection.update({id: 1}, { $set: { firstName: 'James', lastName: 'Gosling'} }, {w:1}, function(err, result){
//       if(err) throw err;    
//       console.log('Document Updated Successfully');
//     });
//     
//   });
//   
//   
//   db.collection('Record', function (err, collection) {
//     
//     collection.remove({id:2}, {w:1}, function(err, result) {        
//         if(err) throw err;            
//         console.log('Document Removed Successfully');
//     });
//     
//   });
//     
//     
//   db.collection('Record', function (err, collection) {
//     
//     collection.find().toArray(function(err, items) {
//         if(err) throw err;    
//         console.log(items);
//         mongoMessage = items.length;            
//     });
//     
//   });
//          
//      
//                 
// });








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
  
  //res.setHeader('content-type', 'application/json');
  //res.json({ a: 1 });
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






/* list past start */



function getRecord(){
  
var pr = new Promise(function(resolve,reject){
  //var res1 = [];
  /*
  var res1 = getRecordMongo('Record');
  console.log('prrrrr' + res1);
  resolve(res1); 
  */      
  MongoClient.connect("mongodb://localhost:27017/mean", function (err, db) {
     
      if(err) throw err;
            
      db.collection('Record', function (err, collection) {
          collection.find().toArray(function(err, items) {
            if(err) throw err;
            console.log('service items from mongodb '+items);
            //items=[{'item':'ok1'}];
            db.close();
            resolve(items);
            /*
            res.setHeader('content-type', 'application/json');      
            res.json({ 'responseAction': result });
            */
          });
      });
  }); 
});

  
pr.then(function(msg){
    console.log('pr next'+msg); 
    res.setHeader('content-type', 'application/json');
    res.json({ 'responseAction': msg });
});
//getRecordMongo(colectionMongoDb);
//.then(function(){
  //res.setHeader('content-type', 'application/json');
  //res.json({ 'responseAction': result });
//});

//var result = [{'item':'item1'},{'item':'item2'}];

//console.log(result);


/*
var result;

MongoClient.connect("mongodb://localhost:27017/mean", function (err, db) {
   
  if(err) throw err;
          
  db.collection('Record', function (err, collection) {
    collection.find().toArray(function(err, items) {
      if(err) throw err;    
      console.log('service items from mongodb '+items);
      
      result = items;
      
      res.setHeader('content-type', 'application/json');      
      res.json({ 'responseAction': result });
            
    });
    
  });  
  
}); 
*/

}




app.post('/getRecord',function(req, res){
  var actionClient = req.body.action;

  console.log(actionClient);

  getRecord();
  

    

});



app.post('/addRecord',function(req, res){
  var recordAddClient = req.body.recordAddClient;

  console.log(recordAddClient);
  
  var result = addRecordMongo(colectionMongoDb,recordAddClient);
  
  
  res.setHeader('content-type', 'application/json');
  res.json({ 'responseAddRecord': ' record ' + recordAddClient + ' added to mongodb' });
  
  getRecord();

});


/* list part end */




var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening on port' + port + '...' + __dirname );
