const authServices = require("../services/authServices");

async function login(req, res, next) {
    try {
        const tokens = await authServices.loginUserCredentials(req.body);        

        res.json(tokens);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function loginGoogle(req, res, next) {
    try {
        const { googleToken } = req.body;

        const tokens = await authServices.loginGoogle(googleToken);        

        res.json(tokens);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function refresh(req, res, next) {
    try {
        const { refreshToken } = req.body;

        const tokens = await authServices.refreshTokens(refreshToken);

        res.json(tokens);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    login,
    loginGoogle,
    refresh
}