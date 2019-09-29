let mysql = require('mysql');
let dbConfig = require('../../config/db');
let dbQuery = require('../../config/query');
let webToken = require('../../util/tokenMaker');

let connection = mysql.createConnection(dbConfig);

module.exports = {
	getmyTeam: (token, callback) => {
		let query = dbQuery.getmyTeam;
		webToken.isToken(token, (result) => {
			if(!result.isToken) {
				callback({"result": 0, "message": "token is invalid"});
			} else {
				const { uid } = result.userInfo;
				query = query.replace('${uid}', uid);
				connection.query(query, (error, row) => {
					if(error) throw error;
					callback(row);
				});
			}
		});
	},
	register: (token, tid, callback) => {
		let query = dbQuery.joinTeam;
		query = query.replace('${tid}', tid);
		webToken.isToken(token, (result) => {
			if(!result.isToken) {
				callback({"result": 0, "message": "token is invalid"});
			} else {
				const { uid } = result.userInfo;
				query = query.replace('${uid}', uid);
				connection.query(query, (error, row) => {
					if(error) throw error;
					callback({"result": 1, "message": "SUCCESS: join team"});
				});
			}
		});
	},
        leave: (token, tid, callback) => {
                let query = dbQuery.leaveTeam;
                query = query.replace('${tid}', tid);
                webToken.isToken(token, (result) => {
                        if(!result.isToken) {
                                callback({"result": 0, "message": "token is invalid"});
                        } else {
                                const { uid } = result.userInfo;
                                query = query.replace('${uid}', uid);
                                connection.query(query, (error, row) => {
                                        if(error) throw error;
                                        callback({"result": 1, "message": "SUCCESS: leave team"});
                                });
                        }
                });
        },

};
