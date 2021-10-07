const usersServices = require("../services/usersServices");

async function createUser(req, res, next) {
    try {
        const user = await usersServices.createUser(req.body);

        res.status(201).json(user);
    } catch (error) {        
        next(error);
    }
}

module.exports = {
    createUser
}