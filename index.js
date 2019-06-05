#! /usr/bin/env node
const program = require("commander");
const chalk = require("chalk").default;
const services = require('./services/index')
program
	.version("1.0.0")
	.alias("lt")
	.description("The life tools,您的生活小帮手")
	.action(option => {
		services(option);
	})
	.on("--help", function() {
		console.log("  Examples:");
		console.log("");
		console.log("$ life-tool");
	})
	.parse(process.argv);
