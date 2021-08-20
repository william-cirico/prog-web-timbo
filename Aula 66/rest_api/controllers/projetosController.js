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

        res.json(projetos);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

async function removeForUser(req, res, next) {
    try {        
        const projetos = await projetosServices.removeProjetoForUser(req.params.id, req.body.nome);

        res.json(projetos);
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