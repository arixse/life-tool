const moment = require("moment");
const chalk = require("chalk").default;
const inquirer = require("inquirer");
const api = require("../http/index");
const clui = require("clui");

const weatherQuestion = {
	type: "input",
	name: "city",
	message: "请输入城市名称"
};
function weatherInput() {
	inquirer.prompt([weatherQuestion]).then(res => {
		if (!res.city) {
			console.log(chalk.red("城市名称错误，请重新输入"));
			weatherInput();
			return;
		}
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
		api.fetchFiveDaysWeather(res.city).then(weathers => {
            spinner.stop();
            if(!weathers) {
                console.log(chalk.redBright('无法查询到对应城市的天气情况，请换个城市试试'));
                weatherInput();
                return;
            }
            let date = moment().format("YYYY-MM-DD :HH:mm:ss");
            console.log(chalk.bgCyan.white(`当前系统时间:`+date));
            weathers.forEach(item=>{
                console.log(chalk.yellow(`${item.week}:${item.weather},${item.wind},${item.winp},${item.temp_low}℃  ~  ${item.temp_high}℃`))
            })
		});
	});
}
module.exports = weatherInput;
