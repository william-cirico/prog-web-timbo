'use strict';

const bcrypt = require("bcrypt");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Endereco, { foreignKey: "id_usuario", as: "endereco" });
      this.belongsToMany(models.Projeto, { 
        through: "usuarios_projetos", 
        foreignKey: "id_usuario", 
        as: "projeto" 
      });      
    }
  };
  Usuario.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "O e-mail precisa ser válido!"
        }
      }
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
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