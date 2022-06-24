/* eslint-disable no-unused-vars */

// Packages
const app = require("express")();
const colors = require("colors");
const EventEmitter = require("events");

// Create Event Emitter
const emitter = new EventEmitter();

// Endpoints
app.get("/uptime/update", (req, res) => {
	const query = req.query;

	emitter.emit("update", {
		name: query.monitorFriendlyName,
		type: query.alertType,
		typeName: query.alertTypeFriendlyName,
		httpStatus: query.alertDetails,
		timeAffected: query.alertFriendlyDuration,
	});
});

// Start Server
app.listen(12981, () => {
	console.log(
		colors.bold.underline.red("[Express] Server running on port 12981")
	);
});

// Export Event Emitter
module.exports = {
	emitter,
};
