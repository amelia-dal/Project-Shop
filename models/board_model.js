//Model deals with all the data access. It accesses all the data from the data files
const fs = require('fs');

exports.userBoards =  function(userId) {
  let userBoards = JSON.parse(fs.readFileSync(__dirname+'/../data/userData.json'));//accesses all of the board data
  console.log("userboards: "+userBoards[userId].boards);
return userBoards[userId].boards;//this should return the boards the user has
//do I need to make an {} that returns the name of the board as well?
}

exports.getBoard =function(boardId){ //acesses the board data of a SPECIFIC board
  let boardData = JSON.parse(fs.readFileSync(__dirname+'/../data/boardData.json'));//accesses all of the board data
return boardData[boardId];//would access the board data for a SPECIFIC board whose ID is input
}

exports.boardTitle=function(boardId){//returns an array with the board's names
  let boardData = JSON.parse(fs.readFileSync(__dirname+'/../data/boardData.json'));//accesses all of the board data
  let boardTitleArray=[];
console.log("BOARD titles model: "+boardId);
  for(let i=0; i<boardId.length; i++){
boardTitleArray.push(boardData[boardId[i]].boardName);
}
    return boardTitleArray;
}

exports.boardTitleSingle=function(boardId){//returns an array with the board's names
  let boardData = JSON.parse(fs.readFileSync(__dirname+'/../data/boardData.json'));//accesses all of the board data
return boardData[boardId].boardName;
}

exports.removeBoardB = function(boardId,userId){//****how do I delete it from the user's file and from the board file???**
    let boardData = JSON.parse(fs.readFileSync(__dirname+'/../data/boardData.json'));
    let userBoardData = JSON.parse(fs.readFileSync(__dirname+'/../data/userData.json'));//accesses all of the board data
    let boardLength=userBoardData[userId].boards;
    let newArray=[];
  if(boardData[boardId]) delete boardData[boardId];

  for(let i=0; i<boardLength.length;i++){
if(boardLength[i]!=boardId){
  newArray.push(boardLength[i]);
}
  }
userBoardData[userId].boards=newArray;
  fs.writeFileSync(__dirname+'/../data/userData.json', JSON.stringify(userBoardData));
  fs.writeFileSync(__dirname+'/../data/boardData.json', JSON.stringify(boardData));

return userBoardData[userId].boards;
}

exports.updateEdit =function(dataChange,boardId,userId){
  let data = JSON.parse(fs.readFileSync(__dirname+'/../data/boardData.json'));
  let userBoardData = JSON.parse(fs.readFileSync(__dirname+'/../data/userData.json'));//accesses all of the board data

data[boardId].boardName=dataChange;
fs.writeFileSync(__dirname+'/../data/boardData.json', JSON.stringify(data));
return userBoardData[userId].boards;
}

exports.updateNew =function(dataChange,userId){
  let data = JSON.parse(fs.readFileSync(__dirname+'/../data/boardData.json'));
  let userBoardData = JSON.parse(fs.readFileSync(__dirname+'/../data/userData.json'));//accesses all of the board data
  console.log("dataChange: "+dataChange);
  let newBoard={
        "boardName": dataChange,
        "boardProducts": []
      }
      data[dataChange]=newBoard;
      userBoardData[userId].boards.push(dataChange);
fs.writeFileSync(__dirname+'/../data/boardData.json', JSON.stringify(data));
fs.writeFileSync(__dirname+'/../data/userData.json', JSON.stringify(userBoardData));

return userBoardData[userId].boards;
//return data[userId].boards;
}
