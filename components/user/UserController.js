const userService=require('./UserService');

const login= async (email,password)=>{
    return await userService.login(email,password);
}

const register =async(email,password,name)=>{
    return await userService.register(email,password,name);
}


module.exports={login,register};
