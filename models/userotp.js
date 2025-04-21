'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserOTP extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserOTP.init(
    {
      user_id: DataTypes.INTEGER,
      otp: DataTypes.TEXT,
      expration_time: DataTypes.DATE,
      is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'UserOTP',
    },
  );
  return UserOTP;
};
