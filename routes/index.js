var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
  res.render('index');
});

//localhost:3000/login
router.get('/login', function(req, res, next) {
  res.render('user/login', { title: 'FPLAdmin' });
});

router.get('/newUser', function(req, res, next) {
  res.render('user/newUser', { title: 'FPLAdmin' });
});

router.get('/register', function(req, res, next) {
  res.render('user/register', { title: 'FPLAdmin' });
});

router.get('/list', function(req, res, next) {
  res.render('incidents/list', { title: 'FPLAdmin' });
});

router.get('/report', function(req, res, next) {
  res.render('report/reportList', { title: 'FPLAdmin' });
});

router.get('/newReport', function(req, res, next) {
  res.render('report/newReport', { title: 'FPLAdmin' });
});



module.exports = router;
