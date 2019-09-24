let express = require('express');
let userFunction = require('./userFunction');

let router = express.Router();

router.post('/register', (request, response) => {
	
	let email = request.body.email;
	let password = request.body.password;
	let nickname = request.body.nickname;
	
	userFunction.register(email, password, nickname, (result) => {
		response.writeHead(200);
		response.end(JSON.stringify(result));
	});
});

router.post('/login', (request, response) => {

	let email = request.body.email;
	let password = request.body.password;

	userFunction.login(email, password, (result) => {
		response.writeHead(200);
		response.end(JSON.stringify(result));
	});
});

router.post('/info', (request, response) => {

	let token = request.body.token;
	
	userFunction.info(token, (result) => {
		response.writeHead(200);
		response.end(JSON.stringify(result));
	});
});

module.exports = router;
