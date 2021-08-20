const createError = require("http-errors");
const { Projeto, Usuario } = require("../db/models");

async function getProjetosByUserId(id) {
    const usuario = await Usuario.findOne({ where: { id } });

    if (!usuario) throw createError(404, "Usuário não encontrado!");
    
    // const model = Usuario
    // for (let assoc of Object.keys(model.associations)) {
    //   for (let accessor of Object.keys(model.associations[assoc].accessors)) {
    //     console.log(model.name + '.' + model.associations[assoc].accessors[accessor]+'()');
    //   }
    // }

    return await usuario.getProjetos();
}

async function createProjetoForUser(id, novoProjeto) {
    const usuario = await Usuario.findOne({ where: { id } });

    if (!usuario) throw createError(404, "Usuário não encontrado!");    

    const  [ projeto ] = await Projeto.findOrCreate({
        where: { nome: novoProjeto.nome }
    });

    await usuario.addProjeto(projeto);

    return projeto;
}

async function removeProjetoForUser(id, nomeProjeto) {
    const usuario = await Usuario.findOne({ where: { id } });

    if (!usuario) throw createError(404, "Usuário não encontrado!");
    
    const projeto = await usuario.hasProjeto({ where: { nome: nomeProjeto } });

    if (!projeto) {
        throw createError(404, "Projeto não encontrado!");
    }

    const  projeto = await Projeto.findOne({
        where: { nome: nomeProjeto }
    });

    await usuario.removeProjeto(projeto);    
}

module.exports = {
    getProjetosByUserId,
    createProjetoForUser,
    removeProjetoForUser
}