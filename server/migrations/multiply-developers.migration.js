'use strict';
const Promise = require('bluebird');
const ObjectId = require('mongodb');

module.exports.id = "multiply-developers9";

module.exports.up = function (done) {
  const users = this.db.collection('users');
  const usersAmount = 50;
  const usersToClonePromise = [];
  users.findOne({email: "eugenalforov@gmail.com"}, { _id: 0 })
    .then((userToClone) => {
      for (let i = 0; i < usersAmount; i++) {
        delete userToClone._id
        usersToClonePromise.push(users.insertOne(userToClone));
      }
      return Promise.all(usersToClonePromise);
    })
    .then(() => {
      done();
    });
};

module.exports.down = function (done) {
 
};
