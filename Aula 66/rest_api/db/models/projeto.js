'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projeto extends Model {
    static associate(models) {
      this.belongsToMany(models.Usuario, {
        through: "usuarios_projetos",
        as: "usuario",
        foreignKey: {
          name: "id_projeto",
          type: DataTypes.UUID
        }
      });
    }
  };
  Projeto.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "O nome do projeto não pode estar vazio" }
      }
    }
  }, {
    sequelize,
    modelName: 'Projeto',
  });
  return Projeto;
};