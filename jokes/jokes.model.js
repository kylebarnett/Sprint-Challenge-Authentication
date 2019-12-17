const db = require('../database/dbConfig.js');

module.exports = {
  add,
  findBy
}

function add(info) {
  return db('users').insert(info)
}

function findBy(filter) {
  return db('users').where(filter)
}