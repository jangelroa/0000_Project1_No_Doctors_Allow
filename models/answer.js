"use strict";

module.exports = function(sequelize, DataTypes) {
  var Answer = sequelize.define("Answer", {
    an_body: DataTypes.STRING,
    an_user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      createNewAnswer: function(answer) {
        Answer.create({
          an_body: answer.an_body,
          an_user_id: question.an_user_id
        });
      }
    }
  });

  return Answer;
};
