const bcrypt = require("bcrypt");
const { Cliente, Endereco } = require("./models");

(async () => {
    // Selecionar todos
    const clientes = await Cliente.findAll();
    for (let cliente of clientes) {
        console.log(cliente.toJSON());
    }

    // Selecionar apenas um registro
    let joao = await Cliente.findOne({ 
        where: {
            nome: "João"
        }
    });
    console.log(joao.toJSON());
    console.log(bcrypt.compareSync("123456", joao.senha));

    // Selecionar registro e associação
    joao = await Cliente.findOne({ 
        where: {
            nome: "João"
        },
        include: Endereco
    });
    console.log(joao.toJSON());

    // Também podemos selecionar através da chave primária com o findByPk
})();
