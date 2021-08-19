const usuariosServices = require("../services/usuariosServices");

async function getAll(req, res, next) {    
    try {
        const usuarios = await usuariosServices.getUsuarios();

        res.json(usuarios);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

async function getOne(req, res, next) {
    try {        
        const usuarios = await usuariosServices.getUsuario(req.params.id);

        res.json(usuarios);
    } catch (err) { 
        console.log(err);       
        next(err);
    }
}

async function create(req, res, next) {
    try {
        const usuario = req.body;

        const novoUsuario = await usuariosServices.createUsuario(usuario);

        res.status(201).json(novoUsuario);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const usuario = req.body;

        const usuarioAtualizado = await usuariosServices.updateUsuario(req.params.id, usuario);

        res.json(usuarioAtualizado);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

async function remove(req, res, next) {
    try {
        await usuariosServices.removeUsuario(req.params.id);

        res.status(204).end();
    } catch (err) {
        console.log(err);
        next(err);
    }
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
};