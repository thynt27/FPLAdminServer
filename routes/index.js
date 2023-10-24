var express = require('express');
var router = express.Router();

const userController = require('../components/user/UserController')
const jwt=require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next){
  res.render('index');
});

//localhost:3000/login
router.get('/login', function(req, res, next) {
  res.render('user/login', { title: 'FPLAdmin' });
});

router.post('/login',async(req,res,next)=>{
  try {
      const {email,password}=req.body;
      const user=await userController.login(email,password);
      if(user)
      {
          // tao token
          const token=jwt.sign({user},'secret',{expiresIn: '1h'});
          req.session.token = token;
          return res.redirect('/');
      }else{
          return res.redirect('/login');
      }
      
  } catch (error) {
      console.log(error);
      next(error);//danh cho web
      return res.status(500).json({result:false,message:'loi he thong'});
  }
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
