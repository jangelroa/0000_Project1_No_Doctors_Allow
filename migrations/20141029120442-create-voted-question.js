"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Voted_questions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      vq_user_id: {
        type: DataTypes.INTEGER
      },
      vq_question_id: {
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
    migration.dropTable("Voted_questions").done(done);
  }
};