let jwt = require('jsonwebtoken');
let jwtConfig = require('../config/jwt');

module.exports = {
	getToken: (payload, callback) => {
		const token = jwt.sign(payload, jwtConfig.secret);
		callback(token);
	},
	isToken: (token, callback) => {
		jwt.verify(token, jwtConfig.secret, (error, decoded) => {
			if(error) 
				callback({isToken: false});
			else 
				callback({isToken: true, userInfo: decoded});
		});
	}
};
