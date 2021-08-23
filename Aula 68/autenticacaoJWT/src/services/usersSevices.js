const createHttpError = require("http-errors")
const { User } = require("../models");

async function getAllUsers() {
    const users = await User.findAll();

    return users;
}

async function createUser(user) {    
    const [ newUser, created ] = await User.findOrCreate({ 
        where: { 
            email: user.email 
        },
        defaults: {
            ...user,
            role: "user"
        }
    });

    if (!created) {
        throw new createHttpError(409, "E-mail already registered");
    }

    return newUser;
}

module.exports = {
    createUser,
    getAllUsers
};