const { body, validationResult } = require("express-validator");

module.exports = {
    post: [
        body("nome")
            .isLength({ min: 4 })
            .withMessage("Nome inválido"),
        body().custom(body => {
                const keys = ['nome'];
                return Object.keys(body).every(key => keys.includes(key));
        }).withMessage('Parâmetros extras enviados'),
        (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });                  
            }

            next();
        }
    ],
    delete: [
        body("nome")
            .isLength({ min: 4 })
            .withMessage("Nome inválido"),
        body().custom(body => {
                const keys = ['nome'];
                return Object.keys(body).every(key => keys.includes(key));
        }).withMessage('Parâmetros extras enviados'),
        (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });                  
            }

            next();
        }
    ]
}