'use strict';

const bcrypt = require("bcrypt");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {}
  };
  Usuario.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {        
        notEmpty: { msg: "O nome não pode estar vazio! "}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "O e-mail precisa ser válido!" },
        notEmpty: { msg: "O e-mail não pode estar vazio! "}
      }
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {        
        notEmpty: { msg: "A senha não pode estar vazia! "}                
      },
      set(value) {
        this.setDataValue("senha", bcrypt.hashSync(value, 10));
      }
    }
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: "usuarios"
  });
  return Usuario;
};