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
        file = `http://192.168.1.7:3000/images/${file.filename}`
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


// delete user by id
// localhost:3000/cpanel/userCpanel/deleteUser/:id
router.get('/deleteUser/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await userController.deleteUser(id);
    if (result) {
      return res.json({status : true});
    } else {
      return res.json({ status: false });
    }
  } catch (error) {
    next(error);
  }
})







module.exports = router;