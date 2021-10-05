const { User } = require("../db/models"); 
const createHttpError = require("http-errors");

async function createUser(req, res, next) {
    const { name, email, password } = req.body;
    try {                
        const [user, created] = await User.findOrCreate({
            where: { email },
            defaults: { name, password }
        });

        if (!created) {
            throw new createHttpError(409, "E-mail já cadastrado");
        }

        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function getUsers(req, res, next) {
    try {
        const users = await User.findAll();

        res.json(users);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function getUser(req, res, next) {
    const userId = res.locals.userId;

    try {
        const user = await User.findOne({ where: { id: userId }});

        if (!user) {
            throw new createHttpError(404, "Usuário não encontrado");
        }

        res.json(user);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    createUser,
    getUser,
    getUsers
}