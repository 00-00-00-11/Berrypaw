/* eslint-disable no-unused-vars */

// Packages
const express = require("express"),
	app = express();
const ws = require("ws");
const EventEmitter = require("events");
const { Sequelize } = require("sequelize");
require("colors");
require("dotenv").config();

// CORS Policy
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

// Middleware
app.use(express.static(`${__dirname}/static`));
app.set("view engine", "ejs");

// Create Event Emitter
const emitter = new EventEmitter();

// Port
let port;

if (process.env.NODE_ENV === "production") {
	port = process.env.SERVER_PORT;
} else {
	port = process.env.DEV_SERVER_PORT;
}

// Create WS Server
const websocket = new ws.Server({
	noServer: true,
});

// Configure sql
const sql = new Sequelize({
	dialect: "postgres",
	username: "berrypaw",
	database: "berrypaw",
	password: "berrypaw",
	host: "/tmp",
	port: 9788,
	logging: (data) => {
		console.log(`${"[Postgres]".yellow} ${"[Log]".green} => ${data.red}`);
	},
});

// HTTP Endpoints
app.get("/", (req, res) => {
	res.status(200).render("status");
});

app.get("/uptime/update", (req, res) => {
	const query = req.query;

	emitter.emit("uptimeUpdate", {
		name: query.monitorFriendlyName,
		type: query.alertType,
		typeName: query.alertTypeFriendlyName,
		httpStatus: query.alertDetails,
		timeAffected: query.alertFriendlyDuration,
	});

	res.status(200).send("HTTP 200 => OK");
});

// Start Server
const server = app.listen(port, () => {
	emitter.emit("serverStarted");

	console.log(
		`${"[Express]".yellow} ${"[HTTP]".green} => ${
			`Server running on port ${port.blue}`.red
		}`
	);

	sql
		.authenticate()
		.then(() => {
			console.log(
				`${"[Postgres]".yellow} ${"[Update]".green} => ${"Connected".red}`
			);
		})
		.catch((err) => {
			console.log(`${"[Postgres]".yellow} ${"[Error]".green} => ${err.red}`);
		});
});

// Upgrade express with WebSocket support
server.on("upgrade", (req, socket, head) => {
	console.log(`${"[Express]".yellow} ${"[WS]".green} => ${"Started".red}`);

	websocket.handleUpgrade(req, socket, head);
});

// Export Event Emitter, and SQL
module.exports = {
	emitter,
	sql,
};
