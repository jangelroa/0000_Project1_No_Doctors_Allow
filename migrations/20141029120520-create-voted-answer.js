"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Voted_answers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      va_user_id: {
        type: DataTypes.INTEGER
      },
      va_answer_id: {
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
    migration.dropTable("Voted_answers").done(done);
  }
};