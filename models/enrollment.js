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
    Enrollment.belongsTo(sequelize.define("User"), {
        foreignKey: "user_id",
        as: "user",
    });
      Enrollment.belongsTo(sequelize.define('Course'), {
        foreignKey: 'course_id',
        as: 'course'
      });

      // Enrollment có nhiều EnrollmentLesson
      Enrollment.hasMany(models.EnrollmentLesson, {
        foreignKey: 'enrollment_id',
        as: 'enrollment_lessons'
      });
    }
  }
  Enrollment.init({
    course_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    total_lesson: DataTypes.INTEGER,
    complete_lesson: DataTypes.INTEGER,
    last_access: DataTypes.DATE,
    price: DataTypes.DOUBLE,
    rating: DataTypes.FLOAT,
    review: DataTypes.TEXT,
    completed_at: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Enrollment',
  });
  return Enrollment;
};