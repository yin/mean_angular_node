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


app.get('/',function(req, res){
       
     //res.sendFile( __dirname + "/" + "index.html" );
     res.sendFile( __dirname + '/public/index.html' );
});



/*
mongoose.connect('mongodb://localhost/mean_post_get');

var thingModel = mongoose.model('Thing',{thing: String});



app.post('/add',function(req, res){
  var thing = req.body.thing;
  var thingDoc = new thingModel({thing: thing});
  console.log(thing);
  thing.Doc.save(function(){
    res.send();
  });
});
*/

var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening on port' + port + '...' + __dirname );