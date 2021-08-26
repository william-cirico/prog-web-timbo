const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authToken = req.headers.authorization?.replace("Bearer ", "");

    if (!authToken) {
        next(createHttpError(401, "Token is missing"));
    }

    try {
        const payload = jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET);
                    
        res.locals.userId = payload.sub;

        next();
    } catch (error) {
        console.log(error);
        next(createHttpError(401, "Invalid Token"));
    }   
}      