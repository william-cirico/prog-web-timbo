const createError = require("http-errors");
const { validationResult } = require("express-validator");
const { Usuario } = require("../db/models");

async function getUsuarios() {    
    return await Usuario.findAll();    
}

async function getUsuario(id) {
    const usuario = await Usuario.findOne({ where: { id } });

    if (!usuario) throw createError(404, "Usuário não encontrado!");

    return usuario;
}

async function createUsuario(usuario) {
    const usuarioJaExiste = await Usuario.findOne({
        where: {
            email: usuario.email
        }
    });

    if (usuarioJaExiste) throw new createError(409, "Usuário já existe!");

    return await Usuario.create(usuario);
}

async function updateUsuario(id, usuarioAtualizado) {    
    const usuario = await Usuario.findOne({ where: { id } });

    if (!usuario) throw new createError(404, "Usuário não encontrado!");

    Object.assign(usuario, usuarioAtualizado);

    usuario.save();
}

async function removeUsuario(id) {
    const usuario = await Usuario.findOne({ where: { id } });

    if (!usuario) throw new createError(404, "Usuário não encontrado!");

    await usuario.destroy();
}

module.exports = {
    getUsuarios,
    getUsuario,
    createUsuario,
    updateUsuario,
    removeUsuario
}