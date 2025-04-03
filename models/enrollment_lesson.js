'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EnrollmentLesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // EnrollmentLesson thuộc về Enrollment
      EnrollmentLesson.belongsTo(models.Enrollment, {
        foreignKey: "enrollment_id",
        as: "enrollment",
      });
      
      // EnrollmentLesson thuộc về Lesson
      EnrollmentLesson.belongsTo(models.Lesson, {
        foreignKey: "lesson_id",
        as: "lesson",
      });
    }
  }
  EnrollmentLesson.init({
    enrollment_id: DataTypes.INTEGER,
    lesson_id: DataTypes.INTEGER,
    completed_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'EnrollmentLesson',
  });
  return EnrollmentLesson;
};