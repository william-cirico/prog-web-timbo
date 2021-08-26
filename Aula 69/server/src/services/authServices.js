const { OAuth2Client } = require('google-auth-library');
const { randomBytes } = require("crypto");
const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const ms = require("ms");
const { User, RefreshToken } = require("../models");
const { Console } = require('console');

async function createRefreshToken(sub) {
    // Definindo o tempo de expiração
    const refreshTokenExpiration = Date.now() + ms(process.env.REFRESH_TOKEN_EXPIRATION);    

    // Criando o token
    const newRefreshToken = jwt.sign(
        { sub }, 
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: refreshTokenExpiration }
    );

    // Armazenando o token no banco de dados
    try {
        const [refreshToken, created] = await RefreshToken.findOrCreate({
            where: { user_id: sub },
            defaults: {
                token: newRefreshToken,
                expiresIn: refreshTokenExpiration
            }
        });
    
        if (!created) {
            refreshToken.token = newRefreshToken;
            refreshToken.expiresIn = refreshTokenExpiration;
            await refreshToken.save();
        }
        
        return newRefreshToken;
    } catch (error) {
        console.log(error);
        throw new createHttpError(500, "Refresh token creation error");
    }        
}

function createAccessToken(sub) {
    const token = jwt.sign(
        { sub }, 
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
    );

    return token;
}

async function loginGoogle(token) {
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const client = new OAuth2Client(CLIENT_ID);

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
    
        const payload = ticket.getPayload();      
        
        console.log(payload);

        const [ user ] = await User.findOrCreate({
            where: {
                email: payload.email
            },
            defaults: {
                name: payload.name,
                password: randomBytes(16).toString("hex"),
                avatar: payload.picture
            }
        });

        const accessToken = await createAccessToken(user.id);
        const refreshToken = await createRefreshToken(user.id);

        return { accessToken, refreshToken };
    } catch (err) {
        console.log(err);
        throw new createHttpError(401, "Invalid Google Token");
    }   
}

async function loginUserCredentials(userCredeentials) {
    const { email, password } = userCredeentials;

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

    const accessToken = createAccessToken(registeredUser.id);
    const refreshToken = createRefreshToken(registeredUser.id);
    
    return { accessToken, refreshToken };
}

async function refreshTokens(refreshToken) {
    const validRefreshToken = await RefreshToken.findOne({
        where: {
            token: refreshToken
        },
        include: "user"
    });

    if (!validRefreshToken) {
        throw new createHttpError(401, "Invalid refresh-token");
    }

    const accessToken = createAccessToken(validRefreshToken.user.id);
    const newRefreshToken = await createRefreshToken(validRefreshToken.user.id);
    
    return { accessToken, refreshToken: newRefreshToken };
}

module.exports = {
    loginGoogle,
    loginUserCredentials,
    refreshTokens
};