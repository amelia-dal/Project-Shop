const io = require( "socket.io" )();
const socketapi = {
    io: io
};
const express = require('express'),
  router = express.Router();
/*
const express = require('express'),
  router = express.Router();

function loggedIn(request, response, next) {
  console.log("middleware")
  if (request.user) {
    next();
  } else {
    response.redirect('/login');
  }
}
*/
io.on('connection', function(socket){
    socket.on('announcement', function(data) {
      console.log('announcement:', data);
      io.emit('announcement', {
        userFirstName: data.userFirstName,
        message: data.message
      //  user: request.user
      });
    });

    socket.on('connectionEvent', function(data) {
      console.log('connection:', data.userFirstName);
      io.emit('connectionEvent', {
          userFirstName:data.userFirstName,
          numClients: io.engine.clientsCount,
          message: 'connected'
      //    user: request.user
      });
    });

});

module.exports = socketapi;
