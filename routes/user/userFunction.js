let mysql = require('mysql');
let dbConfig = require('../../config/db');
let dbQuery = require('../../config/query');
let webToken = require('../../util/tokenMaker');

let connection = mysql.createConnection(dbConfig);

module.exports = {
	register: (email, password, nickname, callback) => {
		
		let query1 = dbQuery.isUser.replace('${email}', email);
		let query2 = dbQuery.createUser;
		query2 = query2.replace('${email}', `"${email}"`);
		query2 = query2.replace('${password}', `"${password}"`);
		query2 = query2.replace('${nickname}', `"${nickname}"`);
		connection.query(query1, (error, result) => {
			if(error) throw error;
			if(result.length) {
				callback({"result": 0, "message": "ERROR: email is already exist!"});
			} else {
				connection.query(query2, (error, result) => {
					if(error) throw error;
					callback({"result": 1, "message": "SUCCESS: register"});
				});
			}
		});
	},
	login: (email, password, callback) => {
		
		let query = dbQuery.isUser.replace('${email}', email);
		
		connection.query(query, (error, result) => {
			if(error) throw error;
			if(result.length !== 1) {
				callback({"result": 0, "message": "ERROR: email is not exist!"});
			} else {
				if(result[0].password !== password) {
					callback({"result": 0, "message": "ERROR: password error!"});
				} else {
					webToken.getToken({
						uid: result[0].uid,
						email: result[0].email, 
						nickname: result[0].nickname,
						auth: result[0].auth
					}, (token) => {
						callback({token});
					});
				}
			}
		});
	},
	info: (token, callback) => {
		webToken.isToken(token, (result) => {
			if(!result.isToken) {
				callback({"result": 0, "message": "token is invalid"});
			} else {
				callback(result.userInfo);
			}
		});
	}
};
