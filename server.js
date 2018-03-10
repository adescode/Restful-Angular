// server.js (Express 4.0)
var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app            = express();

app.use(express.static(__dirname + '/public')); 	// set the static files location /public/img will be /img for users
app.use(morgan('dev')); 					// log every request to the console
app.use(bodyParser()); 						// pull information from html in POST
app.use(methodOverride()); 					// simulate DELETE and PUT


var router = express.Router();

var books = [
 {id:0, title:'book1'},
 {id:1, title:'book2'},
 {id:2, title:'book3'}
 ];

var lastId = 3;

router.get('/book', function(req, res) {
 res.send(books);
});
router.post('/book', function(req, res) {
 var body = req.body;
 var book={id:lastId,title:body.title};
 lastId++;
 books.push(book);
 res.send(books);
});

router.post('/change', function(req, res){
 var book = req.body;
 var reply = false;

 for(var i=0; i < books.length;i++){
  if(books[i].id === book.id
  && books[i].title === book.title){
   reply = true;
   books.splice(i, 1);
  }
 }
 res.send(reply);
});

app.use('/api', router);

app.listen(8000);
console.log('Open http://localhost:8000 to access the files now'); 			// shoutout to the user