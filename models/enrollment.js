'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Enrollment.hasOne(sequelize.define('User'), {
        foreignKey: 'user_id',
        as: 'user'
      });
      Enrollment.belongsTo(sequelize.define('Course'), {
        foreignKey: 'course_id',
        as: 'course'
      });
    }
  }
  Enrollment.init({
    course_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    total_lesson: DataTypes.INTEGER,
    complete_lesson: DataTypes.INTEGER,
    price: DataTypes.DOUBLE,
    rating: DataTypes.FLOAT,
    review: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Enrollment',
  });
  return Enrollment;
};