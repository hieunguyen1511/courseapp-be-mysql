'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(sequelize.define('Enrollment'), {
        foreignKey: 'user_id',
        as: 'enrollments'
      });
      User.hasMany(sequelize.define('Comment'), {
        foreignKey: 'user_id',
        as: 'comments'
      });
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    birth: DataTypes.DATE,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.TEXT,
    role: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};