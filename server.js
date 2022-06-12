/* eslint-disable no-unused-vars */

// Packages
const app = require('express')();
const colors = require("colors");
const EventEmitter = require("events");

// Create Event Emitter
const emitter = new EventEmitter();

// Endpoints
app.get("/ping", (req, res) => {
    emitter.emit("ping", "A ping request has been recieved!");
    res.send("Everything looks good to me!");
});

// Start Server
app.listen(12981, () => {
    console.log(colors.bold.underline.red("[Express] Server running on port 12981"));
});

// Export Event Emitter
module.exports = {
    emitter 
};