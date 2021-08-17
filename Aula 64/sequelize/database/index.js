require("dotenv").config();
const { Sequelize } = require("sequelize");
const config = require("../config/database");

const Usuario = require("../models/Usuario");
const Endereco = require("../models/Endereco");
const Projeto = require("../models/Projeto");

const sequelize = new Sequelize(config);

// Inicializando os models
Usuario.init(sequelize);
Endereco.init(sequelize);
Projeto.init(sequelize);

// Definindo as associações
Usuario.associate(sequelize.models);
Endereco.associate(sequelize.models);
Projeto.associate(sequelize.models);

module.exports = sequelize;