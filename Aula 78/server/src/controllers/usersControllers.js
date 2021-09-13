const { User } = require("../db/models");

async function getUser(req, res, next) {
    const userId = res.locals.userId;

    try {        
        const user = await User({ where: { id: userId }});

        res.json(user);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    getUser
}