const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("addincident")
		.setDescription("Add a Incident (staff only)"),
	async execute(client, interaction) {
		const isStaff = await client.isStaff(interaction.user.id, 6.5);

		if (isStaff.allowed === true) {
			const clean = async (text) => {
				if (text && text.constructor.name == "Promise") text = await text;

				if (typeof text !== "string")
					text = require("util").inspect(text, {
						depth: 1,
					});

				text = text
					.replace(/`/g, "`" + String.fromCharCode(8203))
					.replace(/@/g, "@" + String.fromCharCode(8203));

				return text;
			};

			await interaction.reply({
				content: `You have enough permissions to use this command, however this command is not yet implemented. For testing purposes, your staff role information is ${client.Formatters.codeBlock(
					"javascript",
					await clean(isStaff.data)
				)}`,
			});
		} else {
			await interaction.reply({
				content: "You do not have permission to use this command.",
			});
		}
	},
};
