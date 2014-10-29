"use strict";

module.exports = function(sequelize, DataTypes) {
  var Favorited_question = sequelize.define("Favorited_question", {
    fq_user_id: DataTypes.INTEGER,
    fq_question_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Favorited_question;
};
