const express = require('express'),
  router = express.Router();

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
