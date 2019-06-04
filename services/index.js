const inquirer = require("inquirer");
const chalk = require("chalk").default;
const osUtil = require("./os");
const fs = require("fs");
const path = require("path");
let prompts = [
	{
		type: "list",
		name: "tools",
		message: "想用什么工具呢？",
		choices: [
			{
				name: "系统检测",
				value: "os"
			}
		]
	}
];

function generateTools() {
	let tools = [];
	let files = fs.readdirSync(__dirname);
	files.forEach(file => {
		if (/\.js$/.test(file) && file.indexOf("index") < 0) {
			tools[file] = require(`./${file}`);
		}
	});
}
module.exports = function(options) {
	inquirer.prompt(prompts).then(answers => {
		if (answers.tools && answers.tools == "os") {
			let { osVersion, freeMem } = osUtil();
			console.log(chalk.cyan("当前系统版本为：" + osVersion));
			console.log(chalk.cyan("当前系统剩余内存为：" + freeMem));
		} else {
			console.log(chalk.red("unknown choice"));
		}
	});
};
