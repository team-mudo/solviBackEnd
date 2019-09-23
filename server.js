let http = require('http');
let morgan = require('morgan');
let express = require('express');
let bodyParser = require('body-parser');

let module_db = require('./modules/mysqlConnect');
let dbquery = require('./config/query');

let config = require('./config/jwt'); 

let app = express();
let server = http.createServer(app);
let port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.set('jwt-secret', config.secret);

module_db.startDB();

app.get('/', (request, response) => {
	module_db.excuteDB(dbquery.getUserInfo, (result) => {
		console.log(result[0].uid);
	});
});

server.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

