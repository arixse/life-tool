const moment = require('moment')
const chalk = require("chalk").default;
const Table = require('cli-table');
const inquirer = require("inquirer");
const api = require('../http/index');
const weatherQuestion = {
    type:'input',
    name:'city',
    message:'请输入城市名称'
}
function weatherInput() {
    inquirer.prompt([weatherQuestion]).then(res=>{
        if(!res.city){
            console.log(chalk.red('城市名称错误，请重新输入'));
            weatherInput();
            return;
        }
        console.log(chalk.cyanBright('正在查询中...'));
        api.fetchFiveDaysWeather(res.city).then(weathers=>{
            let date = moment().format("YYYY-MM-DD :HH:mm:ss");
            console.log(weathers);
        })
    })
}
module.exports = function(city) {
    weatherInput();
}