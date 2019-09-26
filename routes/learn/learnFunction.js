let mysql = require('mysql');
let dbConfig = require('../../config/db');
let dbQuery = require('../../config/query');
let webToken = require('../../util/tokenMaker');

let connection = mysql.createConnection(dbConfig);

module.exports = {
	create: (classname, explain, token, callback) => {
		let query1 = dbQuery.createClass1;
		let query2 = dbQuery.createClass2;
		query1 = query1.replace('${classname}', `"${classname}"`);
		query1 = query1.replace('${explain}', `"${explain}"`);
		console.log(query1);
		
		webToken.isToken(token, (result) => {
			if(!result.isToken) {
				callback({"message": "token is invalid"});
			} else {
				connection.query(query1, (error, row) => {
					if(error) throw error;	
					const cid = row.insertId
					const { uid } = result.userInfo;
					query2 = query2.replace('${uid}',`"${uid}"`);
					query2 = query2.replace('${cid}',`"${cid}"`);
					connection.query(query2, (error, row) => {
						if(error) throw error;
						callback({ "cid": cid });
					});
				});
			}
		});
	},
	myClass: (token, callback) => {
		let query = dbQuery.myClass;
		
		webToken.isToken(token, (result) => {
			if(!result.isToken) {
				callback({"message": "token is invalid"});
			} else {
				const { uid } = result.userInfo;
				query = query.replace('${uid}', `"${uid}"`);
				connection.query(query, (error, row) => {
					if(error) throw error;
					callback(row);
				});
			}
		});
	},
	remove: (cid, token, callback) => {
		let query1 = dbQuery.removeClass1; 
		let query2 = dbQuery.removeClass2;
		/* 종속된 수업 지우기 */		
		webToken.isToken(token, (result) => {
			if(!result.isToken) {
				callback({"message": "token is invalid"});
			} else {
				const { uid } = result.userInfo;
				query1 = query1.replace('${uid}',`"${uid}"`);
				query1 = query1.replace('${cid}',`"${cid}"`);
				query2 = query2.replace('${cid}',`"${cid}"`);
				connection.query(query1, (error, row) => {
					if(error) throw error;
					connection.query(query2, (error, row) => {
						if(error) throw error;
						callback({"message": "SUCCESS: remove Class"});
					});
				});	
			}
		});
	},
	team: (cid, token, callback) => {
		let query = dbQuery.getTeam;
		query = query.replace('${cid}', `"${cid}"`);
		
		webToken.isToken(token, (result) => {
			if(!result.isToken) {
				callback({"message": "token is invalid"});
			} else {
				connection.query(query, (error, row) => {
					if(error) throw error;
					callback(row);
				});				
			}
		});	
	},
	teamUser: (tid, token, callback) => {
		let query = dbQuery.getTeamUser;
		query = query.replace('${tid}', `"${tid}"`);
	
		webToken.isToken(token, (result) => {
			if(!result.isToken) {
				callback({"message": "token is invalid"});
			} else {
				connection.query(query, (error, row) => {
					if(error) throw error;
					callback(row);	
				});
			}
		});
	},
	teamCreate: (cid, teamname, token, callback) => {
		let query1 = dbQuery.createTeam1;
		let query2 = dbQuery.createTeam2;		
		query1 = query1.replace('${teamname}', `"${teamname}"`);
		query2 = query2.replace('${cid}', cid);
		
		webToken.isToken(token, (result) => {
			if(!result.isToken) {
				callback({"message": "token is invalid"});
			} else {
				connection.query(query1, (error, row) => {
					if(error) throw error;
					const tid = row.insertId;
					query2 = query2.replace('${tid}', tid);
					connection.query(query2, (error, row) => {
						if(error) throw error;
						callback({ "tid": row.insertId });
					});
				});				
			}
		});
	},
	teamRemove: (tid, token, callback) => {
		let query1 = dbQuery.removeTeam1;
		let query2 = dbQuery.removeTeam2;
		query1 = query1.replace('${tid}', `"${tid}"`);
		query2 = query2.replace('${tid}', `"${tid}"`);
		
		webToken.isToken(token, (result) => {
			if(!result.isToken) {
				callback({"message": "token is invalid"});
			} else {
				connection.query(query1, (error, row) => {
					if(error) throw error;
					connection.query(query2, (error, row) => {
						if(error) throw error;
						callback({"message": "SUCCESS remove Team"});
					});
				});
			}
		});
	},
	teamInvite: (email, tid, token, callback) => {
		let query1 = dbQuery.isUser;
		let query2 = dbQuery.teamInvite1;
		let query3 = dbQuery.teamInvite2;
		query1 = query1.replace('${email}', email);
		query2 = query2.replace('${team}', tid);
		query3 = query3.replace('${tid}', tid);

		webToken.isToken(token, (result) => {
			if(!result.isToken) { 
				callback({"message": "token is invalid"});
			} else {
				connection.query(query1, (error, row) => {
					if(error) throw error;
					if(row.length === 0) {
						callback({"message": "ERROR: email is not exist"});
					}
					console.log(row);
					const uid = row[0].uid;
					query2 = query2.replace('${user}', uid);
					query3 = query3.replace('${uid}', uid);
					connection.query(query3, (error, row) => {
						if(error) throw error;
						if(row.length !== 0){
							callback({"message": "ERROR: user is already exist in team"});
						} else {
							connection.query(query2, (error, row) => {
								callback({"message": "SUCCESS: invite USER"});
							});
						}
					});
				});
			}
		});
	}
};
