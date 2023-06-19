const glob = require("glob");
const fs = require("fs");
const path = require("path");

glob.sync("**/config/*.json").forEach((config) => {
	const configPath = config.split("/");
	fs.createReadStream(path.join(__dirname, `../${config}`)).pipe(
		fs.createWriteStream(
			path.join(__dirname, `../dist/config/${configPath[configPath.length - 1]}`),
		),
	);
});
