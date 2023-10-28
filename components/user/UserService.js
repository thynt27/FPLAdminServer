const userModel = require('./UserModel');
const bcrypt = require('bcryptjs');

//1. kiem tra email,password
//2. kiem tra email co ton tai trong database khong
//3. kiem tra password co dung ko
//4. neu dung, tra ve thong tin user
//5. neu sai, tra ve null
const login = async (email, password) => {
    // const user=users.find(u => u.email==email);
    // if(user && user.password==password)
    // {
    //     return user;
    // }
    // return null;

    try {
        const user = await userModel.findOne({ email: email });

        if (user) {
            const result = bcrypt.compareSync(password, user.password);
            return result ? user : false;
        }

    } catch (error) {
        console.log('login error: ', error);

    }
    return false;

}

const register = async (email, password, name) => {
    try {
        // kiem tra email da co hnay chua
        // selec * form users where email=email
        const user = await userModel.findOne({ email: email });
        if (user) {
            console.log("Email đã được đăng kí");
            return false;
        }
        // them moi user vao data
        // ma hoa password
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        const newUser = { email, password: hash, name, role: 1 };
        const u = new userModel(newUser);
        await u.save();
        return true;


    } catch (error) {
        console('register error: ', error);

    }
    return false;

}

const newUser = async (email, password, name, image, role) => {
    try {
        // kiem tra email da co hnay chua
        // select * form users where email=email
        const user = await userModel.findOne({ email: email });
        if (user) {
            console.log("Email đã được đăng kí");
            return false;
        }
        let roleNumber;

        if (role == "GV") {
            roleNumber = 1;
        } else if (role == "IT") {
            roleNumber = 100;
        } else if (role == "ADMIN") {
            roleNumber = 1000;
        }
        // them moi user vao data
        // ma hoa password
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        const newUser = { email: email, password: hash, name: name, image: image, role: roleNumber };
        const u = new userModel(newUser);
        await u.save();
        return true;
    } catch (error) {
        console('register error: ', error);
    }
}

const getAllUser = async () => {
    try {
        const users = await userModel.find();
        return users;
    } catch (error) {
        console.log('getAllUser error: ', error);
    }
    return null;

}
module.exports = { login, register, newUser, getAllUser };