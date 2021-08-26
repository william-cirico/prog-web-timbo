'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasOne(models.RefreshToken, { foreignKey: "user_id" });
    }

    isPasswordValid(password) {
      return bcrypt.compareSync(password, this.password);
    }

    toJSON() {
      return {
        ...this.get(),
        password: undefined
      }
    }    
  };
  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(password) {
        this.setDataValue("password", bcrypt.hashSync(password, 10));
      }
    },
    avatar: {
      type: DataTypes.STRING,      
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};