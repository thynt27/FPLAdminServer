const userService = require('./UserService');

const login = async (email, password) => {
    return await userService.login(email, password);
}

const register = async (email, password, name) => {
    return await userService.register(email, password, name);
}

const newUser = async (name, email, password, role, image) => {
    return await userService.newUser(name, email, password, role, image);
}

const getAllUser = async () => {
    return await userService.getAllUser();
}

const deleteUser = async (id) => {
    return await userService.deleteUser(id);
}


module.exports = { login, register, newUser, getAllUser, deleteUser };
