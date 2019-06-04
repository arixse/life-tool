const moment = require('moment')
const chalk = require("chalk").default;
module.exports = function() {
    let date = moment().format("YYYY-MM-DD :HH:mm:ss");
    console.log(`当前时间:${chalk.cyan(date)}`);
}