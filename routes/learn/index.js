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
router.post('/team', (request, response) => {});
router.post('/team/create', (request, response) => {});
router.post('/team/delete', (request, response) => {});

module.exports = router;
