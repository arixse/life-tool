const inquirer = require("inquirer");
const chalk = require("chalk").default;
const osUtil = require("./os");
const fs = require("fs");
const path = require("path");
const Table = require('cli-table')
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
			tools[file.replace(/\.js$/, "")] = require(`./${file}`);
		}
	});
	return tools;
}

module.exports = function(options) {
	inquirer.prompt(prompts).then(answers => {
		let tools = generateTools();
		let tool = tools[answers.tools];
		if (tool) {
			let { osVersion, freeMem, totalMem } = tool();
			console.log('os:'+osVersion);
			let table = new Table({head:["FreeMemory","TotalMemory"]})
			table.push([freeMem,totalMem])
			console.log(chalk.cyan(table.toString()));
		} else {
			console.log(chalk.red("unknown choice"));
		}
	});
};
