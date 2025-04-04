'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      // Course thuộc về Category
      Course.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category',
      });

      // Course có nhiều Enrollments
      Course.hasMany(models.Enrollment, {
        foreignKey: 'course_id',
        as: 'enrollments',
      });

      // Course có nhiều Sections
      Course.hasMany(models.Section, {
        foreignKey: 'course_id',
        as: 'sections',
      });

      // Course có nhiều Comments
      Course.hasMany(models.Comments, {
        foreignKey: 'course_id',
        as: 'comments',
      });
    }
  }

  Course.init(
    {
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      status: DataTypes.INTEGER,
      total_rating: DataTypes.INTEGER,
      image: DataTypes.STRING,
      price: DataTypes.DOUBLE,
      discount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Course',
    },
  );

  return Course;
};
