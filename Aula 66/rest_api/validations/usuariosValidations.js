const { body, validationResult } = require("express-validator");

module.exports = {
    post: [
        body("nome")
            .isLength({ min: 4 })
            .withMessage("Nome inválido"),
        body("email")
            .isEmail()
            .withMessage("E-mail inválido"),
        body("senha")            
            .isStrongPassword()
            .withMessage("Senha inválida"),
        (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });                  
            }

            next();
        }
    ],
    put: [
        body("nome")
            .isLength({ min: 4 })
            .withMessage("Nome inválido"),        
        body("senha")
            .isStrongPassword()
            .withMessage("Senha inválida"),
        (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });                  
            }

            next();
        }
    ]
}