'use strict';
const { Model } = require('sequelize');
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Todo, { foreignKey: "user_id" });
    }

    checkPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(password) {
        this.setDataValue("password", bcrypt.hashSync(password, 10));
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};