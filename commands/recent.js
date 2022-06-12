const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("recent")
		.setDescription("View recent incidents"),
	async execute(client, interaction) {
		await interaction.reply({
			content: "This command is not yet implemented.",
		});
	},
};
