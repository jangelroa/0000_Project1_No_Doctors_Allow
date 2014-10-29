"use strict";

module.exports = function(sequelize, DataTypes) {
  var Voted_question = sequelize.define("Voted_question", {
    vq_user_id: DataTypes.INTEGER,
    vq_question_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Voted_question;
};
