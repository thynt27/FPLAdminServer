const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const userController = require('../../components/user/UserController');


//http://localhost:3000/api/user/login
// api login user 
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userController.login(email, password);
        if (user) {
            if (user.isActive) {
                // tao token
                const token = jwt.sign({ user }, 'secret', { expiresIn: '1h' });
                const returnData = {
                    error: false,
                    responseTimestamp: new Date(),
                    statusCode: 200,
                    data: {
                        token: token,
                        user: user
                    }
                }
                return res.status(200).json(returnData);
            } else {
                return res.status(400).json({ result: false, user: null, message: "Account is disabled" });
            }
        } else {
            return res.status(400).json({ result: false, user: null, message: "Email or password is incorrect" });
        }

    } catch (error) {
        console.log(error);
        next(error);//danh cho web
        return res.status(500).json({ result: false, message: 'loi he thong' });
    }
});
//http://localhost:3000/api/user/register
router.post('/register', async (req, res, next) => {

    try {
        const { email, password, name } = req.body;
        const user = await userController.register(email, password, name);
        if (user) {
            return res.status(200).json({ result: true, user: user });
        } else {
            return res.status(400).json({ result: false, user: null, message: 'Register fail' });
        }

    } catch (error) {
        console.log(error);
        next(error);//danh cho web
        return res.status(500).json({ result: false, message: 'loi he thong' });

    }
});

// http://localhost:3000/api/user/addUser
//Add new user
router.post('/addUser', async (req, res, next) => {
    try {

        const { body } = req;
        const { name, email, password, role, image } = body;
        await userController.newUser(name, email, password, role, image);
        return res.status(200).json({ result: true, user: body });

    } catch (error) {
        console.log(error);
        next(error);//danh cho web
        return res.status(500).json({ result: false, message: 'loi he thong' });

    }
});

//http://localhost:3000/api/user/getAllUser
//Get all user
router.get('/getAllUser', async (req, res, next) => {
    try {
        const users = await userController.getAllUser();
        if (users) {
            return res.status(200).json({ result: true, users: users });
        } else {
            return res.status(400).json({ result: false, users: null, message: 'Get all user fail' });
        }

    } catch (error) {
        console.log(error);
        next(error);//danh cho web
        return res.status(500).json({ result: false, message: 'loi he thong' });

    }
});

module.exports = router;