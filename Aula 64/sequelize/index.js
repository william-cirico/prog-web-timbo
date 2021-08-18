const { Op } = require("sequelize");
const sequelize = require("./database");
const { Usuario, Projeto } = sequelize.models;

(async () => {
    try {
        // Criando todas as tabelas
        await sequelize.sync({ force: true });

        await Usuario.bulkCreate([
            {
                nome: "William",
                email: "william@email.com",
                senha: "123456"
            },
            {
                nome: "João",
                email: "joao@email.com",
                senha: "123456"
            },
            {
                nome: "José",
                email: "jose@email.com",
                senha: "123456"
            },
            {
                nome: "Lucas",
                email: "lucas@email.com",
                senha: "123456"
            }
        ]);
        console.log("Usuários criados com sucesso!");

        // Obtendo todos os usuários
        const usuarios = await Usuario.findAll();

        console.log(JSON.stringify(usuarios, null, 4));

        // Especificando os atributos
        const nomeUsuarios = await Usuario.findAll({
            attributes: [["nome", "nome_usuario"]]
        });
                        
        console.log(JSON.stringify(nomeUsuarios, null, 4));

        // Cláusula WHERE
        const nomesComJ = await Usuario.findAll({
            where: {
                nome: {
                    [Op.iLike]: "j%"
                }                
            }
        });

        console.log(JSON.stringify(nomesComJ, null, 4));

        // Nomes com mais de 4 caracteres
        const nomes = await Usuario.findAll({
            where: sequelize.where(sequelize.fn("char_length", sequelize.col("nome")), {
                [Op.gt]: 4
            })
        });

        console.log(JSON.stringify(nomes, null, 4));

        // Checando a senha
        const lucas = await Usuario.findOne({
            where: {
                nome: "Lucas"
            }
        });

        console.log(lucas.checarSenha("12345"));

        // Criando um endereço para o Lucas

        // await Endereco.create({
        //     rua: "Rua 01",
        //     numero: 100,
        //     usuarioId: lucas.id
        // });
        await lucas.createEndereco({
            rua: "Rua 01",
            numero: 100
        });
    
        console.log("Endereço do Lucas criado");

        // Criando um projeto para o Lucas   
        await lucas.createProjeto({
            nome: "Projeto Verão 2021",
            quantidadeHoras: 32
        });
        console.log("Projeto do lucas criado com sucesso!");

        const projeto = await Projeto.findOne({
            where: {
                nome: "Projeto Verão 2021"
            }
        });

        const jose = await Usuario.findOne({
            where: {
                nome: "José"
            }
        });        

        await projeto.addUsuario(jose);
        console.log("José foi adicionado no projeto");
    } catch (error) {
        console.log(error);
    } finally {
        sequelize.close();
    }
})();