var express = require('express');
var router = express.Router();
const userController = require('../../components/user/UserController');
const upLoadFile = require('../../middle/UploadFile');

router.post('/newUser',
  [upLoadFile.single('image')],
  async (req, res, next) => {
    try {
      let { body, file } = req;
      if (file) {
        file = `http://10.22.39.52:3000/images/${file.filename}`
        body = { ...body, image: file };
      }
      const { name, email, password, role, image } = body;
      console.log(body);
      const result = await userController.newUser(name, email, password, role, image);
      console.log('=======>', body);
      console.log('=======>', result);
      if (result) {
        return res.redirect('/');
      } else {
        return res.redirect('/newUser');
      }
    } catch (error) {
      next(error);
    }
  })







module.exports = router;