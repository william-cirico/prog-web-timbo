const fsp = require("fs/promises");
const path = require("path");
const createHttpError = require("http-errors");
const { User } = require("../db/models");

async function createUser(user) {
    const file = user.avatar;

    let avatar;
    if (file) {
        avatar = `${process.env.APP_URL}/images/${file.filename}`;
    }

    const [ newUser, created ] = await User.findOrCreate({
        where: {
            email: user.email
        },
        defaults: {
            name: user.name,
            password: user.password,
            avatar 
        }
    });

    if (!created) {
        // Apagar a imagem da pasta uploads
        if (avatar) {
            await fsp.unlink(path.resolve(__dirname, "..", "..", "uploads", file.filename));
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
}