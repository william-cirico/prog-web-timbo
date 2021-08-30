'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user"
      });      
    }
  };
  RefreshToken.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expiresIn: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'RefreshToken',
  });
  return RefreshToken;
};