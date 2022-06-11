// Packages
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import fs from "fs";
import dotenv from "dotenv";

// Initalize "dotenv"
dotenv.config();

// Initalize REST
const rest = new REST({
	version: "9",
}).setToken(process.env.TOKEN);

// Slash Commands
const commands = [];
const commandFiles = fs
	.readdirSync("./commands")
	.filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

rest
	.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands })
	.then(console.log)
	.catch(console.error);
