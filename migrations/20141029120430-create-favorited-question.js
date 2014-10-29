"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Favorited_questions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      fq_user_id: {
        type: DataTypes.INTEGER
      },
      fq_question_id: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("Favorited_questions").done(done);
  }
};