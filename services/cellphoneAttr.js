const chalk = require("chalk").default;
const inquirer = require("inquirer");
const api = require("../http/index");
const clui = require("clui");

const options = {
	type: "input",
	name: "cellphone",
	message: "请输入手机号码"
};
function cliInput() {
	inquirer.prompt([options]).then(res => {
		if (res.cellphone) {
			let spinner = new clui.Spinner("正在查询中...", [
				"⣾",
				"⣽",
				"⣻",
				"⢿",
				"⡿",
				"⣟",
				"⣯",
				"⣷"
			]);
			spinner.start();
			api.fetchCellPhoneOrigin(res.cellphone).then(res => {
				spinner.stop();
				if (res) {
					console.log(chalk.cyan(`${res.operators}  ${res.att}`));
				} else {
					console.log(chalk.red("无法查询到该手机号，重新输入"));
				}
			});
		} else {
			console.log(chalk.red("手机号有误，重新输入"));
			cliInput();
		}
	});
}
module.exports = cliInput;
