const { sequelize, Usuario, Endereco } = require("./db/models");

(async () => {
    try {
        await sequelize.sync({ force: true });
        // Inserindo um usuário
        const joao = await Usuario.create({
            nome: "João",
            email: "joao@email.com",
            senha: "123456"
        });
        console.log("João foi criado!");

        // Inserindo o endereço
        await joao.createEndereco({
            rua: "Rua 01",
            numero: 123
        });

        // Criando um projeto para aquele usuário
        await joao.createProjeto({
            nome: "Projeto 01",
            quantidadeHoras: 12
        });
    } catch (err) {
        console.error("Ocorreu um erro: ", err);
    } finally {
        sequelize.close();
    }
})();