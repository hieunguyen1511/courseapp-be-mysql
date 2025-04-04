'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      Lesson.belongsTo(models.Section, {
        foreignKey: "section_id",
        as: "section",
      });
    }
  }
  Lesson.init({
    section_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    is_quizz: DataTypes.BOOLEAN,
    video_url: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Lesson',
  });
  return Lesson;
};