'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Lesson thuộc về Section
      Lesson.belongsTo(models.Section, {
        foreignKey: 'section_id',
        as: 'section',
      });

      // Lesson có nhiều EnrollmentLesson
      Lesson.hasMany(models.EnrollmentLesson, {
        foreignKey: 'lesson_id',
        as: 'enrollment_lessons',
      });

      // Lesson có nhiều Question
      Lesson.hasMany(models.Question, {
        foreignKey: 'lesson_id',
        as: 'questions',
      });

      Lesson.hasMany(models.Question, {
        foreignKey: 'lesson_id',
        as: 'questions',
      });
    }
  }
  Lesson.init(
    {
      section_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      is_quizz: DataTypes.BOOLEAN,
      duration: DataTypes.TEXT,
      video_url: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Lesson',
    },
  );
  return Lesson;
};
