const projetosServices = require("../services/projetosServices");

async function getAllByUserId(req, res, next) {    
    try {
        const projetos = await projetosServices.getProjetosByUserId(req.params.id);

        res.json(projetos);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

async function createForUser(req, res, next) {
    try {        
        const projetos = await projetosServices.createProjetoForUser(req.params.id, req.body);

        res.status(201).json(projetos);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

async function removeForUser(req, res, next) {
    try {        
        await projetosServices.removeProjetoForUser(req.params.id, req.body.nome);

        res.status(204).end();
    } catch (err) {
        console.log(err);
        next(err);
    }
}

module.exports = {
    getAllByUserId,
    createForUser,
    removeForUser
}