const usersServices = require("../services/usersServices");

async function createUser(req, res, next) {
    try {
        const userInfo = {
            ...req.body,
            avatar: req.file
        };

        const user = await usersServices.createUser(userInfo);

        res.json(user);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function getUser(req, res, next) {
    try {
        const user = await usersServices.getUser(res.locals.userId);

        res.json(user);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    createUser,
    getUser
};