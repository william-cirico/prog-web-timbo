const createHttpError = require("http-errors");
const fsp = require("fs/promises");
const path = require("path");
const { User } = require("../models");

async function createUser(user) {
    const { name, email, password } = user;

    let avatar;    
    if (user.avatar) {
        avatar = `${process.env.APP_URL}/images/${user.avatar.filename}`;
    }    

    const [ newUser, created ] = await User.findOrCreate({
        where: { email },
        defaults: {
            name,
            password,
            avatar                    
        }
    });

    if (!created) {
        // Remover a imagem
        if (avatar) {
            await fsp.unlink(path.resolve(__dirname, "..", "..", "uploads", user.avatar.filename));
        }    

        throw new createHttpError(409, "User already exists");
    }
    
    return newUser;               
}

async function getUser(userId) {   
    const user = await User.findOne({ where: { id: userId }});

    if (!user) {
        throw new createHttpError(404, "User not found!");
    }

    return user;
}

module.exports = {
    createUser,
    getUser
};