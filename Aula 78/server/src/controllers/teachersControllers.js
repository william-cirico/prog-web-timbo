const { User } = require("../db/models");
const createHttpError = require("http-errors");

async function getTeachers(req, res, next) {
    try {
        const teachers = await User.findAll({ where: { role: "teacher" }});
        
        res.json(teachers);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function createTeacher(req, res, next) {
    const { name, email, phone, password } = req.body;

    try {
        const teacher = await User.create({ name, email, phone, password, role: "teacher" });

        if (!teacher) {
            throw new createHttpError(404, "Teacher not found");
        }
        
        res.status(201).json(teacher);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function getClasses(req, res, next) {
    const teacherId = res.locals.userId;
    try {
        const teacher = await User.findOne({ where: { id: teacherId }});

        if (!teacher) {
            throw new createHttpError(404, "Teacher not found");
        }

        console.log(teacher);

        res.end();
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    createTeacher,
    getClasses,
    getTeachers
};