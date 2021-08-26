const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const ms = require("ms");
const { randomBytes } = require("crypto");
const createHttpError = require("http-errors");
const { User, RefreshToken } = require("../db/models");

async function verifyTokenGoogle(googleToken) {
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const client = new OAuth2Client(CLIENT_ID);

    try {
        const ticket = await client.verifyIdToken({
            idToken: googleToken,
            audience: CLIENT_ID,
        });

        return ticket.getPayload(); 
    } catch (error) {
        throw new createHttpError(401, "Google Token invalid");
    }           
}

function createAccessToken(sub) {
    const accessToken = jwt.sign(
        { sub }, 
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRATION
        }
    );

    return accessToken
}

async function createRefreshToken(sub) {    
    const expiresIn = Date.now() + ms(process.env.REFRESH_TOKEN_EXPIRATION);
    
    const refreshToken = jwt.sign(
        { sub }, 
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn
        }
    );    

    const [ refreshTokenDB, created ] = await RefreshToken.findOrCreate({
        where: {
            user_id: sub
        },
        defaults: {
            expiresIn,
            token: refreshToken
        }
    });

    if (!created) {
        refreshTokenDB.token = refreshToken;
        refreshTokenDB.expiresIn = expiresIn;
        await refreshTokenDB.save();
    }

    return refreshToken;
}

async function loginGoogle(googleToken) {
    const payload = await verifyTokenGoogle(googleToken);
    const { name, email, picture } = payload;
    const password = randomBytes(16).toString("hex");

    const [ user ] = await User.findOrCreate({
        where: {
            email
        },
        defaults: {
            name,
            password,
            avatar: picture
        }
    });

    const accessToken = createAccessToken(user.id);
    const refreshToken = await createRefreshToken(user.id);
    
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
    refreshTokens
};