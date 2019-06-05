const os = require("os");
const chalk = require("chalk").default;
const clui = require('clui');
const Gauge = clui.Gauge;
module.exports = function() {
	let osVersion = os.platform() + " " + os.release();
	let freeMem = (os.freemem() / Math.pow(1024, 3)).toFixed(2);
    let totalMem = (os.totalmem() / Math.pow(1024, 3)).toFixed(2);
	let usedMem = (totalMem-freeMem).toFixed(2);
	console.log("当前系统版本:" + osVersion);
	console.log(chalk.cyan('系统内存使用情况:'))
	console.log(chalk.cyan(Gauge(usedMem,totalMem,30,totalMem*0.8,usedMem+'GB')))
};
