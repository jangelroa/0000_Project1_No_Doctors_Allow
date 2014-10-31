"use strict";

module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define("Question", {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    qu_user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      createNewQuestion: function(question) {
        Question.create({
          title: question.qu_title,
          body: question.qu_body,
          qu_user_id: question.qu_user_id
        });
      }
    }
  });

  return Question;
};
