const moment = require('moment')
const chalk = require("chalk").default;
const axios = require('axios').default;
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
        console.log(chalk.cyanBright('正在查询中...'));
        api.fetchFiveDaysWeather(res.city).then(weathers=>{
            let date = moment().format("YYYY-MM-DD :HH:mm:ss");
            console.log(weathers);
        }).catch(reason=>{
            console.log(chalk.red(reason));
            weatherInput();
        })
    })
}
module.exports = function(city) {
    weatherInput();
}