let http = require('http');
let cors = require('cors');
let express = require('express');
let bodyParser = require('body-parser');

let api = require('./routes');

let app = express();
let server = http.createServer(app);
let port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/', api);

app.get('*', (request, response) => {
	response.redirect('/');
});
app.get('/', (request, response) => {
	response.send('SolviBackEnd');
});

server.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

