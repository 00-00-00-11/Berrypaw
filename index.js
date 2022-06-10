// Packages
import {
    Client,
    Collection,
    Formatters,
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    Intents
} from 'discord.js';
import fs from 'fs';
import modals from 'discord-modals';
import dotenv from 'dotenv';
import logger from './logger.js';

// Initalize "dotenv"
dotenv.config();

// Initalize Client
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

// Initalize Discord Modals
modals(client);

// Ready Event
client.on("ready", async () => {
    logger.info("200", `Logged in as "${client.user.tag}"`, client.user);

    // Set Client Status
    client.user.setStatus("dnd");

    // Set Client Activity
    client.user.setActivity(`for outages`, {
        type: "WATCHING",
    });
});

// Login to Discord
client.login(process.env.TOKEN);