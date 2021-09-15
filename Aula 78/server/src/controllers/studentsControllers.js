const createHttpError = require("http-errors");
const { User } = require("../db/models");

async function createStudent(req, res, next) {
    const { name, email, phone, password } = req.body;     
    try {        
        const [user, created] = await User.findOrCreate({
            where: {
                email
            },
            defaults: { name, email, phone, password, role: "student" }
        });

        if (!created) {
            throw new createHttpError(409, "User already exists");
        }

        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

async function getStudents(req, res, next) {
    try {
        const students = await User.findAll({where: { role: "student" }});
        console.log(students);

        res.json(students);
    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    createStudent,
    getStudents
}