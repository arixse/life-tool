#! /usr/bin/env node
const program = require("commander");
const chalk = require("chalk").default;
const services = require('./services/index');
const figlet = require('figlet');
program
	.version("1.0.0")
	.alias("lt")
	.description("The life tools,您的生活小帮手")
	.description(chalk.cyan(
		figlet.textSync('The life tool',{
			font:'Ghost',
			horizontalLayout:'default',
			verticalLayout:'default',
		})
	))
	.action(option => {
		services(option);
	})
	.on("--help", function() {
		console.log("  Examples:");
		console.log("");
		console.log("$ life-tool");
	})
	.parse(process.argv);
