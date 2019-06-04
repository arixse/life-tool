const inquirer = require("inquirer");
const chalk = require("chalk").default;
const fs = require("fs");

let prompts = [
	{
		type: "list",
		name: "tools",
		message: "想用什么工具呢？",
		choices: [
			{
				name: "系统检测",
				value: "os"
			},
			{
				name:"天气预报",
				value:"weather"
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
			tool();
		} else {
			console.log(chalk.red("unknown choice"));
		}
	});
};
