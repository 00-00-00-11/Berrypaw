const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add_incident')
		.setDescription('Add a Incident (staff only)'),
	async execute(client, interaction) {
        if (client.isStaff(interaction.user.id) === true) {
            await interaction.reply({
                content: "This command is not yet implemented."
            });
        } else {
            await interaction.reply({
                content: "You do not have permission to use this command."
            });
        }
	},
};