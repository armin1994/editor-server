var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();


router.post('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  const pathDirectory = 'C:/Users/Armin/Documents/learning/editor-server/client';
  const filePath = `${pathDirectory}/app.js`;
  const newCode = req.body.code;
  fs.writeFile(filePath, newCode, 'utf-8', function (err) {
    if (err) throw err;
    console.log('filelistAsync complete');
    res.json({success: true});
  });
});

module.exports = router;