'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {

  db.renameColumn('user', 'name', 'firstname', callback)
  db.addColumn('user', 'lastname', {
    type: 'string',
    length: 40
  }, callback)
};

exports.down = function (db) {
  db.renameColumn('user', 'name', 'firstname', callback)
  db.removeColumn('user', 'lastname')

};

exports._meta = {
  "version": 1
};
