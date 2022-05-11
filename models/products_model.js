//product model deals with all the specifics, the products, of a given board
const fs = require('fs');
let axios = require('axios'); //install with npm install axios

/*
exports.getInfo = async function(title){
  try {
       const resp = await axios.get('https://www.omdbapi.com/?apikey=75ece70e&t='+title);
       return resp.data;
   } catch (err) {
       console.error(err);
   }//the try catch is necessary
}
*/
//API------------------------------------------
exports.boardName = function(boardName) {
  return boardName;
}

exports.boardProducts = function(boardId) { //this should return a list of product Ids for a given board
  let boardData = JSON.parse(fs.readFileSync(__dirname + '/../data/boardData.json')); //accesses all of the board data
  return boardData[boardId].boardProducts;
}

exports.productTitles = function(productIds) {
  let productTitles = JSON.parse(fs.readFileSync(__dirname + '/../data/productData.json'));
  let productTitlesArray = [];
  console.log("product ids: "+productIds);

  for (let i = 0; i < productIds.length; i++) {
    productTitlesArray.push(productTitles[productIds[i]].productName);
  }
  return productTitlesArray;
}

exports.productData = function(productId) { //returns all the data for a given product
  let productData = JSON.parse(fs.readFileSync(__dirname + '/../data/productData.json'));
  return productData[productId];
}

exports.productPrice = function(productIds) { //this should return a list of product Ids for a given board
  let productPrice= JSON.parse(fs.readFileSync(__dirname + '/../data/productData.json'));
  let productPricesArray = [];

  for (let i = 0; i < productIds.length; i++) {
    productPricesArray.push(productPrice[productIds[i]].productPrice);
  }
  return productPricesArray;
}

exports.productLink= function(productIds) { //this should return a list of product Ids for a given board
  let productLink= JSON.parse(fs.readFileSync(__dirname + '/../data/productData.json'));
  let productLinkArray = [];

  for (let i = 0; i < productIds.length; i++) {
    productLinkArray.push(productLink[productIds[i]].productLink);
  }
  return productLinkArray;
}

exports.productImage= function(productIds) { //this should return a list of product Ids for a given board
  let productImage= JSON.parse(fs.readFileSync(__dirname + '/../data/productData.json'));
  let productImageArray = [];

  for (let i = 0; i < productIds.length; i++) {
    productImageArray.push(productImage[productIds[i]].productImage);
  }
  return productImageArray;
}

exports.uploadImage =function(dataChange,productId){
  let productImage= JSON.parse(fs.readFileSync(__dirname + '/../data/productData.json'));
productImage[productId].productImage=dataChange;
console.log("DATA CHANGE"+dataChange);
fs.writeFileSync(__dirname+'/../data/productData.json', JSON.stringify(productImage));
return productImage[productId].productImage;
}
