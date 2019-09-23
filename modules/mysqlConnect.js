let mysql = require('mysql');
let dbConfig = require('../config/db.json');

let connection = mysql.createConnection({
	host: dbConfig.HOST,
	port: dbConfig.PORT,
	user: dbConfig.USER,
	password: dbConfig.PASSWORD,
	database: dbConfig.DBNAME
});

module.exports = {
	startDB: () => {
		connection.connect();
	},
	endDB: () => {
		connection.end();
	},
	excuteDB: (dbQuery, callback) => {
		connection.query(dbQuery, (error, result, fields) => {
			if(error) console.log(error);
			callback(result);
		});
	}
}
