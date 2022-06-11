// Packages
import {
  Client,
  Collection,
  Formatters,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  Intents,
} from "discord.js";
import fs from "fs";
import colors from "colors";
import modals from "discord-modals";
import dotenv from "dotenv";

// Initalize "dotenv"
dotenv.config();

// Initalize Client
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// Initalize Discord Modals
modals(client);

// Ready Event
client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`.bold.underline.red);

  // Set Client Status
  client.user.setStatus("dnd");

  // Set Client Activity
  client.user.setActivity(`for outages`, {
    type: "WATCHING",
  });
});

// Debug Event
client.on("debug", (info) => {
  console.log(colors.green(info));
});

// Error Event
client.on("error", (error) => {
  console.log(colors.red(error));
});

// Login to Discord
client.login(process.env.TOKEN);
