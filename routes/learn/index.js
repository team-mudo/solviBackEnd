let express = require('express');
let learnFunction = require('./learnFunction');

let router = express.Router();

router.post('/create', (request, response) => {
	
	let classname = request.body.classname;
	let explain = request.body.explain;
	let token = request.body.token;

	learnFunction.create(classname, explain, token, (result) => {
		response.writeHead(200);
		response.end(JSON.stringify(result));	
	});
		
});
router.post('/myClass', (request, response) => {
	
	let token = request.body.token;

	learnFunction.myClass(token, (result) => {
		response.writeHead(200);
		response.end(JSON.stringify(result));
	});
});
router.post('/remove', (request, response) => {
	
	let cid = request.body.cid;
	let token = request.body.token;

	learnFunction.remove(cid, token, (result) => {
		response.writeHead(200);
		response.end(JSON.stringify(result));
	});
});
router.post('/team', (request, response) => {

	let cid = request.body.cid;
	let token = request.body.token;
	
	learnFunction.team(cid, token, (result) => {
		response.writeHead(200);
		response.end(JSON.stringify(result));
	});
});
router.post('/team/user', (request, response) => {
	
	let tid = request.body.tid;
	let token = request.body.token;

	learnFunction.teamUser(tid, token, (result) => {
		response.writeHead(200);
		response.end(JSON.stringify(result));
	});
});
router.post('/team/create', (request, response) => {

	let cid = request.body.cid;
	let teamname = request.body.teamname;
	let token = request.body.token;
		
	learnFunction.teamCreate(cid, teamname, token, (result) => {
		response.writeHead(200);
		response.end(JSON.stringify(result));
	});
});
router.post('/team/remove', (request, response) => {

	let tid = request.body.tid;
	let token = request.body.token;

	learnFunction.teamRemove(tid, token, (result) => {
		response.writeHead(200);
		response.end(JSON.stringify(result));
	});
});
router.post('/team/invite', (request, response) => {

	let email = request.body.email;
	let tid = request.body.tid;
	let token = request.body.token;

	learnFunction.teamInvite(email, tid, token, (result) => {
		response.writeHead(200);
		response.end(JSON.stringify(result));
	});
});
module.exports = router;
