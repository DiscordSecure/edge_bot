const fs = require("fs"); 
const Discord = require('discord.js')
module.exports = class Message extends require("../structures/Event") {
    constructor(args) {
        super(args, {
    	    name: "Message"
        });
    };

    async run(client, message) {
        if (message.channel.type === "dm" || message.author.bot || !message.channel.permissionsFor(client.user).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        if (client.function.badWord(message.content)) return message.delete().then(() => message.channel.send("Arrêtez de dire des insultes !").then(msg => msg.delete(3000))).catch(() => undefined);


        const blacklistUser = [
           ""

        ];


        const usedPrefix = new RegExp(`^(${client.config.PREFIX.split("").map(p => `\\${p}`).join("")}|<@!?${client.user.id}>\ |${client.user.username.toLowerCase()}\ )`).exec(message.content.toLowerCase());
        if (!usedPrefix || blacklistUser.includes(message.author.id)) return;
        const args = message.content.split(/\s+/g);
        const searchCommand = args.shift().slice(usedPrefix[0].length);
        if (!searchCommand) return;
        const cmd = client.commands.get(searchCommand.trim().toLowerCase()) || client.aliases.get(searchCommand.trim().toLowerCase());
        if (!cmd) return;
        return cmd.run(client, message, args);


    };
};
