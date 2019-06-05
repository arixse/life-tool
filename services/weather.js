const moment = require('moment')
const chalk = require("chalk").default;
const inquirer = require("inquirer");
const api = require('../http/index');
const clui = require('clui');

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
        let spinner = new clui.Spinner('正在查询中...',['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷']);
        spinner.start();
        api.fetchFiveDaysWeather(res.city).then(weathers=>{
            spinner.stop();
            let date = moment().format("YYYY-MM-DD :HH:mm:ss");
            console.log(weathers);
        })
    })
}
module.exports = function(city) {
    weatherInput();
}