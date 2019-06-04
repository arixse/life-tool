const os = require("os");
const Table = require('cli-table');
const chalk = require("chalk").default;
module.exports = function() {
	let osVersion = os.platform() + " " + os.release();
	let freeMem = (os.freemem() / Math.pow(1024, 3)).toFixed(2) + "GB";
    let totalMem = (os.totalmem() / Math.pow(1024, 3)).toFixed(2) + "GB";
    
	console.log("os:" + osVersion);
	let table = new Table({ head: ["FreeMemory", "TotalMemory"] });
	table.push([freeMem, totalMem]);
	console.log(chalk.cyan(table.toString()));
};
