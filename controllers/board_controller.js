//this route file is for the overall site
const express = require('express'),
  router = express.Router();

  const Boards = require('../models/board_model');
  //let boards = Boards.getBoards(userID);
  //const Async = require('./axiosAsync');

  function loggedIn(request, response, next) {
    console.log("middleware")
    if (request.user) {
      next();
    } else {
      response.redirect('/login');
    }
  }
/*
  app.get('/async', async function(request, response){
    let title='star+wars';
    let data = await Async.getInfo(title);
    response.send(data);
  });
*/
//API STUFFFF-------------------------------------------------------
router.get('/MyBoards',loggedIn,function(request, response) { //this is the stadard main page
  //console.log("user:"+request.user); //Passport adds user to the Request object if loggedIn
  console.log("email:"+request.user._json.email); //Passport adds user to the Request object if loggedIn
  //console.log("headers:"+request.headers); //Encrypted session info is sent as a request header

let boardData =Boards.userBoards(request.user._json.email);//gets the ids of the boards for a specific user
let boardTitles=Boards.boardTitle(boardData);//inputs the user's board IDs so controller can access it

console.log("board data controller: "+boardData);
console.log("BOARD titless controller: "+boardTitles);

  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("MyBoards/MyBoards", {
    user: request.user,
    boardTitles:boardTitles,
    boards:boardData //this accesses all of the boards for a certain individual
  });
});


router.get('/MyBoards/new',loggedIn, function(request, response) {//external routes
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("MyBoards/new", {
    user: request.user
  });
});

router.post('/MyBoards/new',loggedIn, function(request, response) {
  let boardName = request.body.boardName;
  let newBoard =Boards.updateNew(boardName,request.user._json.email);
  //let boardData =Boards.userBoards(request.user._json.email);//gets the ids of the boards for a specific user
  let boardTitles=Boards.boardTitle(newBoard);//inputs the user's board IDs so controller can access it

console.log("NEW board name: "+boardName);
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("MyBoards/back",{ //folder structure for views, internal
    //render anything or any file you want with the data
    user: request.user,
    boardTitles:boardTitles,
    boards:newBoard
  });
});

router.get('/MyBoards/edit/:boardId',loggedIn, function(request, response) {//external routes
let boardId = request.params.boardId;
let boardTitle=Boards.boardTitleSingle(boardId);
console.log("Board Title: "+boardTitle);
console.log("board Id edit: "+boardId);
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("MyBoards/edit/edit", {
    user: request.user,
    boardId:boardId,
    boardTitle:boardTitle
  });
});

router.post('/MyBoards/edit/:boardId',loggedIn, function(request, response) {//external routes
  let newBoardName = request.body.boardName;
  let boardId = request.params.boardId;
  let updateEdit =Boards.updateEdit(newBoardName,boardId,request.user._json.email);
  console.log("update EDIT: "+updateEdit);
  let boardTitles=Boards.boardTitle(updateEdit);//inputs the user's board IDs so controller can access it
  console.log("POST EDIT: "+boardId);
  console.log("POST title: "+boardTitles);

  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("MyBoards/back", {
    user: request.user,
    boardTitles:boardTitles,
    boards:updateEdit
  });
});

router.post('/MyBoards/delete/:boardId',loggedIn, function(request, response) {
  let boardId = request.params.boardId;
  let removedBoard=Boards.removeBoardB(boardId,request.user._json.email);
  let boardTitles=Boards.boardTitle(removedBoard);//inputs the user's board IDs so controller can access it

  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("MyBoards/back",{
    user: request.user,
    boards:removedBoard,
    boardTitles:boardTitles
  });
});

router.post('/MyBoards/rate/:boardId',loggedIn, function(request, response) {
  let boardId = request.params.boardId;
  let removedBoard=Boards.removeBoardB(boardId,request.user._json.email);
  let boardTitles=Boards.boardTitle(removedBoard);//inputs the user's board IDs so controller can access it

  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("MyBoards/back",{
    user: request.user,
    boards:removedBoard,
    boardTitles:boardTitles
  });
});

module.exports = router;
