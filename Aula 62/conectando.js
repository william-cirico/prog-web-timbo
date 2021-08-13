const { Sequelize } = require("sequelize");

// conectionString
// const sequelize = new Sequelize("postgres://postgres:123456@localhost:5432/sequelize");

// parâmetros de conexão
const sequelize = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    username: "postgres",
    password: "123456",
    database: "sequelize",
    // logging: false // desabilita o logging
});

// (async () => {
//     try {
//         // Testando a conexão
//         await sequelize.authenticate();
//         console.log("Conexão bem-sucedida!");
//     } catch (err) {
//         console.log(err.message);
//     } finally {
//         // Fechando a conexão
//         sequelize.close();
//     }
// })();

module.exports = sequelize;