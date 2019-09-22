let http = require('http');
let express = require('express');
let socketIo = require('socket.io');
let bodyParser = require('body-parser');

let port = process.env.PORT || 8080;

let app = express();
let server = http.createServer(app);
let io = socketIo(server);

io.on("connection", (socket) => {
	socket.on("", () => {
		console.log("");
		io.sockets.emit("",());
	});
	socket.on("disconnect", () => {
		console.log("Client disconnected");
	});
});

server.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

