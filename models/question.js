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
          title: question.question_title,
          body: question.question_body
        });
      }
    }
  });

  return Question;
};
