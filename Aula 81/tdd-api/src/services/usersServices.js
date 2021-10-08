const { User } = require("../db/models");
const createHttpError = require("http-errors");

async function getUsers() {    
    const users = await User.findAll();

    return users;
}

async function createUser({ name, email, password }) {    
    const [user, created] = await User.findOrCreate({ where: { email },
        defaults: { name, password } 
    });

    if (!created) {
        throw new createHttpError(409, "E-mail já cadastrado");
    }

    return user;
}

async function updateUser(id, name) {    
    const user = await User.findOne({ where: { id }});

    if (!user) {
        throw new createHttpError(404, "Usuário não encontrado");
    }

    user.name = name;
    await user.save();

    return user;
}

async function removeUser(id) {
    const user = await User.findOne({ where: { id }});

    if (!user) {
        throw new createHttpError(404, "Usuário não encontrado");
    }

    await user.destroy();
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    removeUser
}