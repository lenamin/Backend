const userDao = require("../dao/userDao");

// 회원가입 
const createUser = async (data) => {
    return await userDao.createUser(data);
}

// 로그인 
const findUserByEmail = async (email) => {
    return await userDao.findUserByEmail(email);
};

MediaSourceHandle.exports = {
    createUser,
    findUserByEmail,
};