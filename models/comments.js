'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Comment thuộc về User
      Comments.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      // Comment thuộc về Course
      Comments.belongsTo(models.Course, {
        foreignKey: "course_id",
        as: "course",
      });
    }
  }
  Comments.init({
    user_id: DataTypes.INTEGER,
    course_id: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    parent_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};