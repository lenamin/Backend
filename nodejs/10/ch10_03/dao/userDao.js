const models = require("../models");

const createUser = async (data) => {
    return await models.User.create(data);
};

// 전체 유저 반환 
const findAllUsers = async () => {
    return await models.User.findAll();
}

const updateUser = async (id, data) => {
    return await models.User.update(data, {
        where: { id },
    });
};

const findUserByEmail = async (email) => {
    return await models.User.findOne({
        where: { email },
    });
};

module.exports = {
    createUser,
    findAllUsers,
    updateUser,
    findUserByEmail,
};
