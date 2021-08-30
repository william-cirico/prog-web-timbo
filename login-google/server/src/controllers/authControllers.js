const authServices = require("../services/authServices");

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

        console.log(refreshToken);

        const tokens = await authServices.refreshTokens(refreshToken);

        res.json(tokens);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    loginGoogle,
    refresh
}