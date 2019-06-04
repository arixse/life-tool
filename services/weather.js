const moment = require('moment')
const chalk = require("chalk").default;
const axios = require('axios').default;
const Table = require('cli-table')
module.exports = function(city) {
    let date = moment().format("YYYY-MM-DD :HH:mm:ss");
    console.log(`当前时间:${chalk.cyan(date)}`);

    axios({
        url:`http://api.k780.com/?app=weather.future&weaid=${city||1}&&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json`,
        method:'GET'
    }).then(res=>{
        let table = new Table({head:["日     期","天    气","风     向","风     力","最高温度","最低温度"]});
        let {result} = res.data;
        result.forEach(item=>{
            table.push([
                item.week,
                item.weather,
                item.wind,
                item.winp,
                item.temp_high,
                item.temp_low
            ])
        })
        console.log(chalk.cyan(table.toString()));
    })
}