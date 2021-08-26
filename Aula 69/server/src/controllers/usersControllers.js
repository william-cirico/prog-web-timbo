const usersServices = require("../services/usersServices");

async function get(req, res, next) {
    try {
        const user = await usersServices.getUser(res.locals.userId);

        res.json(user);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function create(req, res, next) {
    try {
        const user = {
            ...req.body,
            avatar: req.file
        }

        const newUser = await usersServices.createUser(user);

        res.json(newUser);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    get,
    create
};