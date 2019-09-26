let mysql = require('mysql');
let dbConfig = require('../../config/db');
let dbQuery = require('../../config/query');
let webToken = require('../../util/tokenMaker');

let connection = mysql.createConnection(dbConfig);

module.exports = {

};
