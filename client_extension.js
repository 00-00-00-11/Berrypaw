const fetch = require("node-fetch");

module.exports = (client) => {
	client.prefix = "status.";

	client.isStaff = async (userID, permRequirement) => {
		// Render the URL
		const url = `https://api.fateslist.xyz/baypaw/perms/${userID}`;

		// Get data
		let data = await fetch(url);

		// Check if user is staff and ensure that the user is Developer+
		if (data.statusText === "OK") {
			data = await data.json();

			const permNumber = data.perm;

			if (permNumber >= permRequirement) {
				return {
					data: data,
					allowed: true,
				};
			} else {
				return {
					data: data,
					allowed: false,
				};
			}
		} else {
			return {
				allowed: false,
			};
		}
	};
};
