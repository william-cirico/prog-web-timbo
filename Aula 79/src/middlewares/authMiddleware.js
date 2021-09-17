const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => { 
    const authError = createHttpError(401, "Authorization information is missing or invalid.");
    
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        next(authError);
    }
    
    try {
        const payload = jwt.verify(token, process.env.TOKEN_SECRET);                        
                        
        res.locals.userId = payload.sub;

        next();
    } catch (error) {
        console.log(error);
        next(authError);
    }       
}