//..............Include Express..................................//
const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const methodOverride = require('method-override');
const app = express();

app.use(methodOverride('_method'));//middleware for CRUD:UPDATE and DELETE

//..............Apply Express middleware to the server object....//
app.use(express.json()); //Used to parse JSON bodies (needed for POST requests)
app.use(express.urlencoded());//*********app.use(express.urlencoded({extended: true}));
app.use(express.static('public')); //specify location of static assests
app.set('views', __dirname + '/views'); //specify location of templates
app.set('view engine', 'ejs'); //specify templating library

app.use(require('./controllers/auth'));
app.use(require('./controllers/index'));
//entity
app.use(require('./controllers/board_controller'));
app.use(require('./controllers/user_controller'));
app.use(require('./controllers/products_controller'));

app.use("", function(request, response) {
  response.redirect('/error?code=400');
});


//..............socket stuff...............................//
let server = require('http').Server(app);
let io = require('socket.io')(server);

const port = process.env.PORT || 3000;
app.set('port', port); //let heroku pick the port if needed

let socketapi =require('./controllers/socketConnections');
socketapi.io.attach(server);//attach sockets to the server

//start the server
server.listen(port, function() {
  console.log('Server started at http://localhost:'+port+'.')
});

//..............FIlE UPLOAD...............................//
// SET STORAGE


//..............Start the server...............................//
/*
const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server started at http://localhost:'+port+'.')
});

*/
