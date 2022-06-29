/* eslint-disable no-unused-vars */

// Packages
const app = require("express")();
const colors = require("colors");
const EventEmitter = require("events");

// Create Event Emitter
const emitter = new EventEmitter();

// Port
let port;

if (process.env.NODE_ENV === "production") {
	port = process.env.SERVER_PORT;
} else {
	port = process.env.DEV_SERVER_PORT;
}

// Endpoints
app.get("/uptime/update", (req, res) => {
	const query = req.query;

	emitter.emit("uptimeUpdate", {
		name: query.monitorFriendlyName,
		type: query.alertType,
		typeName: query.alertTypeFriendlyName,
		httpStatus: query.alertDetails,
		timeAffected: query.alertFriendlyDuration,
	});
});

// Start Server
app.listen(port, () => {
	emitter.emit("serverStarted");

	console.log(
		colors.bold.underline.red(`[Express] Server running on port ${port}`)
	);
});

// Export Event Emitter
module.exports = {
	emitter,
};
