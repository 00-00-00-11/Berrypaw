// Packages
const {
	Client,
	Collection,
	Formatters,
	MessageEmbed,
	MessageActionRow,
	MessageButton,
	Intents,
} = require("discord.js");
const fs = require("fs");
const colors = require("colors");
const modals = require("discord-modals");
require("dotenv").config();

// Initalize Client
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// Add extras to Client for simplicity with interactions
client.Formatters = Formatters;
client.MessageEmbed = MessageEmbed;
client.MessageActionRow = MessageActionRow;
client.MessageButton = MessageButton;

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

// Collections
client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();

// Add Commands
const commandFiles = fs
	.readdirSync("./commands")
	.filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

// Add Modals
const modalFiles = fs
	.readdirSync("./modals")
	.filter((file) => file.endsWith(".js"));

for (const file of modalFiles) {
	const modal = require(`./modals/${file}`);
	client.modals.set(modal.data.name, modal);
}

// Add Buttons
const buttonFiles = fs
	.readdirSync("./buttons")
	.filter((file) => file.endsWith(".js"));

for (const file of buttonFiles) {
	const button = require(`./buttons/${file}`);
	client.buttons.set(button.data.name, button);
}

// Interaction Event(s)
client.on("interactionCreate", async (interaction) => {
	// Slash Command
	if (interaction.isCommand()) {
		const command = client.commands.get(interaction.commandName);

		if (command) {
			try {
				await command.execute(client, interaction);
			} catch (error) {
				console.error(error);

				let embed = new MessageEmbed()
					.setTitle("Oops, there was an error!")
					.setColor("RANDOM")
					.addField("Message", Formatters.codeBlock("javascript", error), false);

				await interaction.reply({
					embeds: [embed],
				});
			}
		} else {
			await interaction.reply("This command does not exist.");
		}
	}

	// Button
	if (interaction.isButton()) {
		const button = client.buttons.get(interaction.customId);
		const command = client.commands.get(interaction.customId);

		if (button) {
			try {
				await button.execute(client, interaction);
			} catch (error) {
				console.error(error);

				let embed = new MessageEmbed()
					.setTitle("Oops, there was an error!")
					.setColor("RANDOM")
					.addField("Message", Formatters.codeBlock("javascript", error), false);

				await interaction.reply({
					embeds: [embed],
				});
			}
		} else {
			// Check if button is equal to a slash command
			if (command) {
				try {
					await command.execute(client, interaction);
				} catch (error) {
					console.error(error);

					let embed = new MessageEmbed()
						.setTitle("Oops, there was an error!")
						.setColor("RANDOM")
						.addField("Message", Formatters.codeBlock("javascript", error), false);

					await interaction.reply({
						embeds: [embed],
					});
				}
			} else {
				// button does not equal to anything
				await interaction.reply("This button does not have any functionality.");
			}
		}
	}
});

client.on('modalSubmit', async (interaction) => {
    const modal = client.modals.get(interaction.customId);

    if (!modal) {
        let embed = new MessageEmbed()
            .setTitle("Error")
            .setColor("#FF0000")
            .setDescription("Command does not exist!");

        await interaction.reply({
            embeds: [embed]
        });
    }

    try {
        await modal.execute(client, interaction);
    } catch (error) {
        let embed = new MessageEmbed()
            .setTitle("Oops, there was an error!")
            .setColor("RANDOM")
            .addField("Message", Formatters.codeBlock("javascript", error), false);

        await interaction.reply({
            embeds: [embed]
        });
    }
});

// Login to Discord
client.login(process.env.TOKEN);
