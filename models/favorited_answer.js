"use strict";

module.exports = function(sequelize, DataTypes) {
  var Favorited_answer = sequelize.define("Favorited_answer", {
    fa_user_id: DataTypes.INTEGER,
    fa_answer_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Favorited_answer;
};
