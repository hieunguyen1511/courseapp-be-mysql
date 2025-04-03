'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Section extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Section thuộc về Course
      Section.belongsTo(models.Course, {
        foreignKey: "course_id",
        as: "course",
      });
      // Section có nhiều Lessons
      Section.hasMany(models.Lesson, {
        foreignKey: "section_id",
        as: "lessons",
      });
    }
  }
  Section.init({
    course_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Section',
  });
  return Section;
};