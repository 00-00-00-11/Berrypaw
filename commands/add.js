const { SlashCommandBuilder } = require("@discordjs/builders");
const { Modal, TextInputComponent, showModal } = require("discord-modals");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("addincident")
		.setDescription("Add a Incident (staff only)"),
	async execute(client, interaction, server) {
		const isStaff = await client.isStaff(interaction.user.id, 6.5);

		if (isStaff.allowed === true) {
			const modal = new Modal()
				.setCustomId("add-incident")
				.setTitle("Add Incident (Staff Only)")
				.addComponents([
					new TextInputComponent()
						.setCustomId("title")
						.setLabel("Incident Title")
						.setStyle("SHORT")
						.setMinLength(1)
						.setPlaceholder("Please enter a title for the incident.")
						.setRequired(true),
					new TextInputComponent()
						.setCustomId("description")
						.setLabel("Incident Description")
						.setStyle("LONG")
						.setMinLength(5)
						.setPlaceholder("Please enter a description for the incident.")
						.setRequired(true),
				]);

			showModal(modal, {
				client: client,
				interaction: interaction,
			});
		} else {
			await interaction.reply({
				content: "You do not have permission to use this command.",
			});
		}
	},
};
