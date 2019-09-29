let express = require('express');
let teamFunction = require('./teamFunction');

let router = express.Router();

router.post('/my', (request, response) => {

	let token = request.body.token;
	
	teamFunction.getmyTeam(token, (result) => {
		response.writeHead(200);
		response.end(JSON.stringify(result));
	});	
});

router.post('/register', (request, response) => {

	let token = request.body.token;
	let tid = request.body.tid;
	
	teamFunction.register(token, tid, (result) => {
		response.writeHead(200);
		response.end(JSON.stringify(result));
	});
});

router.post('/leave', (request, response) => {

        let token = request.body.token;
        let tid = request.body.tid;

        teamFunction.leave(token, tid, (result) => {
                response.writeHead(200);
                response.end(JSON.stringify(result));
        });
});

module.exports = router; 
