'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Endereco extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Usuario, { 
        foreignKey: {
          name: "id_usuario",
          allowNull: false
        }, 
        as: "usuario" 
      });      
    }
  };
  Endereco.init({
    rua: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Endereco',
    tableName: "enderecos"
  });
  return Endereco;
};