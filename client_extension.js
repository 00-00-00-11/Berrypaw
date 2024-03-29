const fetch = require("node-fetch");

module.exports = (client) => {
	// Prefix
	if (process.env.NODE_ENV === "production") {
		client.prefix = process.env.PREFIX;
	} else {
		client.prefix = process.env.DEV_PREFIX;
	}

	client.isStaff = async (userID, permRequirement) => {
		// Render the URL
		const fatesURL = `https://api.fateslist.xyz/baypaw/perms/${userID}`;
		const metroURL = `https://catnip.metrobots.xyz/team`;
		const selectlistURL = `https://select-api.fateslist.xyz/api/users/get?id=${userID}`;

		// Get data
		let fates = await fetch(fatesURL);
		let metro = await fetch(metroURL);
		let selectlist = await fetch(selectlistURL);

		// Check if user is staff and ensure that the user perm is equal or higher than the required perm level
		if (fates.statusText === "OK" && metro.statusText === "OK" && selectlist.statusText === "OK") {
			fates = await fates.json();
			metro = await metro.json();
			selectlist = await selectlist.json();

			// Fetch the user data from Metro Reviews
			metro = metro.find((user) => user.id === userID) || null;

			// Fetch the role/badge data from Selectlist
			selectlist = {
				roles: selectlist.roles, 
				badges: selectlist.badges
			};

			const permNumber = fates.perm;

			if (permNumber >= permRequirement) {
				return {
					fates: fates,
					metro: metro || {},
					selectlist: selectlist || {},
					allowed: true,
				};
			} else {
				return {
					fates: fates,
					metro: metro || {},
					selectlist: selectlist || {},
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
