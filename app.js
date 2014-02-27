
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// node needful
var fs = require('fs');
var sys = require('sys');

app.use(express.bodyParser());
app.use(express.multipart());

// all environments
app.set('port', process.env.PORT || 8732);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
//app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


// upload needful 2.0

app.use(express.static(__dirname + '/public')); //used to expose the static info in the public folder @WS

app.get('/',function(req,res){
fs.readFile('dragdrop.html',function (err, data){
    res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
    res.write(data); // I need to write to a upload folder
    res.end();
});

});


// God Bless @WS

var imgur = require('imgur-upload');
imgur.setClientID('ccb04612b4a8b91');

app.post('/upload',function(req,res)
{
console.log(req.files.file.path);
fs.readFile(req.files.file.path, function (err, data) {
  	imgur.upload(req.files.file.path, function (err,res) {
		console.log(res);
		console.log(err);
		//var url = console.log(res.data.link); 
	})
  
  res.redirect("back");
  });
});

