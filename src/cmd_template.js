const Discord = require("discord.js");
const config = require('../../config.js')
module.exports = class cmds extends require("../structures/Command") {
    constructor(client) {
        super(client, {
            name: "",
            description: "",
            category: "Bot",
            aliases: [],
            usage: [],
        });
    };

    async run(client, message, args) {
	
	};
};