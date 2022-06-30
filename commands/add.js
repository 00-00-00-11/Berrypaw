const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("addincident")
		.setDescription("Add a Incident (staff only)"),
	async execute(client, interaction, server) {
		const isStaff = await client.isStaff(interaction.user.id, 6.5);

		if (isStaff.allowed === true) {
			await interaction.reply({
				content:
					"You have enough permissions to use this command, however this command is not yet implemented.",
			});
		} else {
			await interaction.reply({
				content: "You do not have permission to use this command.",
			});
		}
	},
};
