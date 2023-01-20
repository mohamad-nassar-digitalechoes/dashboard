const multer  = require('multer')
const path=require('path');
var storage = multer.diskStorage(
  {
      destination: './uploads/',
      filename: function ( req, file, cb ) {
        var randomname=Date.now()+ Math.floor(Math.random() * 100000000000000);  
        cb( null, randomname + path.extname(file.originalname));
      }
  }
);
var upload = multer({ storage: storage });
module.exports=upload;