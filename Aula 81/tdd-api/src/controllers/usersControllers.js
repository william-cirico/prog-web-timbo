const usersServices = require("../services/usersServices");

async function getUsers(req, res, next) {
    try {
        const users = await usersServices.getUsers();

        res.json(users);
    } catch (error) {
        next(error);
    }
}

async function createUser(req, res, next) {
    try {
        const user = await usersServices.createUser(req.body);

        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

async function updateUser(req, res, next) {
    const { name } = req.body;
    try {
        const user = await usersServices.updateUser(req.params.id, name);

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

async function removeUser(req, res, next) {
    try {
        await usersServices.removeUser(req.params.id);

        res.status(204).end();
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getUsers,
    createUser,
    updateUser,
    removeUser
}