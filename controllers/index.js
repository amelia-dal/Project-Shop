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

  const User = require('../models/index_model');


router.get('/', function(request, response) {//this is the stadard main page
  console.log(request.user); //Passport adds user to the Request object if loggedIn
  //console.log(request.user._json.email); //Passport adds user to the Request object if loggedIn
  console.log(request.headers); //Encrypted session info is sent as a request header

  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("index", {
    user: request.user
  });
});


router.get('/chat',loggedIn, function(request, response) {
  if(request.user){
    let user = User.getUser(request.user._json.email);
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("chat", {
      userFirstName: user.firstName,
      user: request.user
    });
  }else{
    response.redirect('/login');
  }
});

router.get('/login', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("login", {
    user: request.user
  });
});

router.get('/error', function(request, response) {
  const errorCode = request.query.code;
  if (!errorCode) errorCode = 400;
  const errors = {
    '400': "Unknown Client Error",
    '401': "Invlaid Login",
    '404': "Resource Not Found",
    '500': "Server problem"
  }
  response.status(errorCode);
  response.setHeader('Content-Type', 'text/html')
  response.render("error", {
    user: request.user,
    "errorCode": errorCode,
    "details": errors[errorCode]
  });
});

module.exports = router;
