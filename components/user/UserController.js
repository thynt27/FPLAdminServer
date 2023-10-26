const userService=require('./UserService');

const login= async (email,password)=>{
    return await userService.login(email,password);
}

const register =async(email,password,name)=>{
    return await userService.register(email,password,name);
}

const newUser =async(email,password,name,image,role)=>{
    return await userService.newUser(email,password,name,image,role);
}

const getAllUser =async()=>{
    return await userService.getAllUser();
}


module.exports={login,register, newUser ,getAllUser};
