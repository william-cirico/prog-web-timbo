const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const ms = require("ms")

const { RefreshToken, User } = require("../models");

async function createTokens(user) {
    const { email, password } = user;

    const registeredUser = await User.findOne({ where: { email } });    

    // Checando se o usuário existe
    if (!registeredUser) {
        throw new createHttpError(401, "E-mail or password invalid");
    }

    // Checando se a senha é válida
    const isPasswordValid = registeredUser.isPasswordValid(password);

    if (!isPasswordValid) {
        throw new createHttpError(401, "E-mail or password invalid");
    }

    // Criando o token
    const token = jwt.sign({ 
        sub: registeredUser.id,
        role: registeredUser.role
    }, process.env.TOKEN_SECRET, {
        expiresIn: "20m"
    });

    // Criando o refresh token
    const refreshTokenExpiration = Date.now() + ms("30 days");    

    const newRefreshToken = jwt.sign({
        sub: registeredUser.id,
        exp: refreshTokenExpiration,
    }, process.env.REFRESH_TOKEN_SECRET);

    // Armazenando o refreshToken no banco de dados
    const [refreshToken, created] = await RefreshToken.findOrCreate({
        where: { user_id: registeredUser.id },
        defaults: {
            token: newRefreshToken,
            expiresIn: refreshTokenExpiration
        }
    });

    if (!created) {
        refreshToken.token = newRefreshToken;
        refreshToken.save();
    }

    return { token, refreshToken: newRefreshToken };
}

async function refreshToken({ refreshToken }) {    
    // Validando o refreshToken
    const validRefreshToken = await RefreshToken.findOne({
        where: {
            token: refreshToken
        },
        include: "user"
    });

    console.log(validRefreshToken);

    if (!validRefreshToken) {
        throw new createHttpError(401, "Invalid Refresh Token");
    }

    // Criando o token
    const token = jwt.sign({ 
        sub: validRefreshToken.user.id,
        role: validRefreshToken.user.role
    }, process.env.TOKEN_SECRET, {
        expiresIn: "20m"
    });

    // Verificando se o refreshToken expirou
    const isRefreshTokenExpirated = Date.now() > validRefreshToken.expiresIn;

    if (isRefreshTokenExpirated) {
        // Criando novo refreshToken
        const refreshTokenExpiration = Date.now() + ms("30 days");    

        const newRefreshToken = jwt.sign({
            sub: validRefreshToken.user.id,
            exp: refreshTokenExpiration,
        }, process.env.REFRESH_TOKEN_SECRET);

        // Salvando no banco
        validRefreshToken.token = newRefreshToken;
        validRefreshToken.expiresIn = refreshTokenExpiration;
        await validRefreshToken.save();
        
        return { token, refreshToken: newRefreshToken }
    }

    return { token };
}

module.exports = {
    createTokens,
    refreshToken
};