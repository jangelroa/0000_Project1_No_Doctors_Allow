"use strict";

var bcrypt = require("bcrypt");
var salt = bcrypt.genSaltSync(10);
var passport = require("passport"),
    localStrategy = require("passport-local").Strategy;

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      createNewUser: function(userInfo) {
        User.create({
          firstname: userInfo.firstname,
          lastname: userInfo.lastname,
          username: userInfo.username,
          password: User.hashPass(userInfo.password)
        });
      },
      hashPass: function(password) {
        return bcrypt.hashSync(password, salt);
      },

      comparePass : function(userpass, dbpass) {
        return bcrypt.compareSync(userpass, dbpass);
      },

      authorize: function(userInfo, err, success) {
        User.find({ where: {
          username: userInfo.username
        }}).done(function(error, user){
          if(user && !error){
            if(User.comparePass(userInfo.password, user.password)){
              console.log("You are authorize");
            } else {
              console.log("Wrong password buddy!");            
            }
          } else {
              console.log(user + "User is not even found...");
          }
        });
      }
    }
  });

  passport.use(new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, function(username, password, passFinish) {
      User.find({
        where: {
          username: username
        }
      }).done(function(error, user) {
        if (user) {
          if (User.comparePass(password, user.password)) {
            passFinish(null, user);
          } else {
          console.log("Password don't match");
            passFinish(null, null);
          }
        } else {
          console.log("No user was found");
          passFinish(null, null);
        } 
      });
    }
  ));

  return User;
};
