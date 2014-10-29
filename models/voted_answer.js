"use strict";

module.exports = function(sequelize, DataTypes) {
  var Voted_answer = sequelize.define("Voted_answer", {
    va_user_id: DataTypes.INTEGER,
    va_answer_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Voted_answer;
};
