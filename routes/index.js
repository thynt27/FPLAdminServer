var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
  res.render('index');
});

//localhost:3000/login
router.get('/login', function(req, res, next) {
  res.render('user/login', { title: 'Express' });
});

module.exports = router;
