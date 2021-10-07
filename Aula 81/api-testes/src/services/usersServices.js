const { User } = require("../db/models");
const createHttpError = require("http-errors");

async function createUser({ name, email, password }) {
    const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: { name, password }
    });

    if (!created) {
        throw new createHttpError(409, "E-mail já cadastrado");
    }

    return user;
}

module.exports = {
    createUser
}