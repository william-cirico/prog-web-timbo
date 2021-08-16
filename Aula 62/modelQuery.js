const { Op } = require("sequelize");
const sequelize = require("./conectando");
const { Cliente, Endereco } = require("./models");

(async () => {
    try {
        await Cliente.sync({ force: true });
        await Endereco.sync({force: true });
        // Inserindo um registro
        const pedro = await Cliente.create({
            nome: "Pedro",
            email: "pedro@email.com",
            senha: "123456"});
        console.log("Pedro foi salvo no banco de dados");
        console.log(pedro.toJSON());
        console.log(pedro.senha);

        // Inserindo vários registros
        const clientes = await Cliente.bulkCreate([
            {nome: "João", email: "joao@email.com", senha: "123456"},
            {nome: "Marcos", email: "marcos@email.com", senha: "123456"}
        ]);
        console.log("João e Marcos foram salvos no banco de dados");        
        

        // Atualizando o registro
        pedro.pontos = 10;
        await pedro.save();
        console.log("Os pontos do pedro foram atualizados");

        // Atualizando sem a instância do registro
        await Cliente.update({ pontos: 20 }, {
            where: {
                nome: "Pedro",
                // nome: {
                //     [Op.iLike]: "P%"
                // }
            }
        });
        console.log("Os pontos do pedro foram atualizados");

        // Deletando o registro
        // await pedro.destroy();
        // console.log("Pedro foi deletado do banco de dados");

        // Deletando sem a instância do registro
        await Cliente.destroy({
            where: {
                nome: "Marcos"
            }
        });
        console.log("Marcos foi deletado do banco de dados");
    } catch (error) {
        console.log(error.message);
    } finally {
        sequelize.close();
    }
})();