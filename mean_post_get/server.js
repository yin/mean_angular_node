var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');


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

mongoose.connection.on("open", function(ref) {
  console.log("Connected to mongo server.");
});

mongoose.connection.on("error", function(err) {
  console.log("Could not connect to mongo server!");
});

var db = mongoose.connect('mongodb://localhost/mean_post_get', function(err) {
            if (err) {
                logger.error('MongoDB connection error: ' + err);
                // return reject(err);
                process.exit(1);
            } else {
                console.log("MongoDb connection succeeded");
            }
        });

var thingModel = db.model('Thing',{thing: String});



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





var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening on port' + port + '...' + __dirname );
