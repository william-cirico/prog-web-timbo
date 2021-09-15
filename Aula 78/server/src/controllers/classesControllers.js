const { Class, User } = require("../db/models");
const { Op } = require("sequelize");
const createHttpError = require("http-errors");

async function createClass(req, res, next) {    
    const { name, year, teacherId, studentsIds } = req.body;

    try {
        const teacher = await User.findOne({ 
            where: { 
                [Op.and]: [{ id: teacherId }, { role: "teacher" }]                
            }
        });

        if (!teacher) {
            throw new createHttpError(404, "Teacher not found");
        }        

        const students = await User.findAll({ 
            where: { 
                [Op.and]: [{id: studentsIds}, { role: "student"} ]
            }
        });              

        const newClass = await Class.create({ name, year, teacher_id: teacherId }); 
        console.log(newClass);       
        await newClass.addStudents(students);

        res.status(201).json(newClass);
    } catch (error) {
        console.log(error);
        next(error);
    }    
}

async function getAllClasses(req, res, next) {
    try {
        const classes = await Class.findAll();

        res.json(classes);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    createClass,
    getAllClasses
};