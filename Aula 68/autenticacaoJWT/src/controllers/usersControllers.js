const usersServices = require("../services/usersSevices");

async function getAll(req, res, next) {
    try {
        const users = await usersServices.getAllUsers();

        res.json(users);
    } catch (error) {   
        console.log(error);
        next(error);        
    }
}

async function create(req, res, next) {
    try {
        const user = await usersServices.createUser(req.body);

        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    create,
    getAll
};