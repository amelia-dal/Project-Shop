//this file for routes is specific to the individual user
const express = require('express'),
  router = express.Router();
const multer = require('multer');

  const Products = require('../models/products_model');
  const Boards = require('../models/board_model');

  function loggedIn(req, res, next) {
    console.log("middleware")
    if (req.user) {
      next();
    } else {
      res.redirect('/login');
    }
  }

  router.get('/MyBoards/products/:boardId',loggedIn, function(req, res) {//external routes
    let boardId=req.params.boardId;
    let productIds=Products.boardProducts(boardId);
    let productTitles=Products.productTitles(productIds);
    let productPrice=Products.productPrice(productIds);
    let productLink=Products.productLink(productIds);
    let productImage=Products.productImage(productIds);
    res.status(200);
    res.setHeader('Content-Type', 'text/html')
    res.render("MyBoards/products/products", {
      user: req.user,
      productTitles:productTitles,
      productId:productIds,
      boardId:boardId,
      productPrice:productPrice,
      productLink:productLink,
      productImage:productImage
    });
  });

  //..............FIlE UPLOAD...............................//
  let privateStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      console.log(file)
      cb(null, Date.now()+'-'+file.originalname.replace(' ', '-'));
    }
  });
  let privateUpload = multer({ storage: privateStorage });

  let publicStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      console.log(file)
      cb(null, Date.now()+'-'+file.originalname.replace(' ', '-'));
    }
  });
  let publicUpload = multer({ storage: publicStorage });

  //..............FIlE UPLOAD ROUTES...............................//
    router.post('/MyBoards/products/:boardId/:productId',loggedIn,publicUpload.single('picture'), (req, res, next) => {
    //  console.log("test;;;;;;;;FILE "+file);

      const file = req.file;
      if (!file) {
        const error = {
        'httpStatusCode' : 400,
        'message':'Please upload a file'
         }
        res.send(error);
      }
      //------Information organizations
  let boardId=req.params.boardId;
  let productId=req.params.productId;

  let productIds=Products.boardProducts(boardId);
  let productTitles=Products.productTitles(productIds);
  let productPrice=Products.productPrice(productIds);
  let productLink=Products.productLink(productIds);
  //let productImage=Products.productImage(productIds);

  let boardData =Boards.userBoards(req.user._json.email);//gets the ids of the boards for a specific user
  let boardTitles=Boards.boardTitle(boardData);//inputs the user's board IDs so controller can access it

  let uploadImage=Products.uploadImage(file.filename,productId);
      res.render('MyBoards/back',{
        productImage: uploadImage,//"/images/"+file.filename,
        user: req.user,
        boardTitles:boardTitles,
        boards:boardData,
        boardId:boardId,
        photoLocation:"/images/"+file.filename
      });
    });

module.exports = router;
