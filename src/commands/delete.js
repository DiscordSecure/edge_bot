const Discord = require("discord.js")
const backup = require("discord-backup"),
settings = {
    prefix: "."
};
    client = new Discord.Client()

module.exports = class cmds extends require("../structures/Command") {
    constructor(client) {
        super(client, {
            name: "list",
            description: "",
            category: "Backup",
            aliases: ["l", "li"],
            usage: []
        });
    };

    async run(client, message, args) {
        const backupid = args.join(" ")
        backup.delete(backupid)
        message.reply(`${backupid} a été suprimer avec succes`)
    };
    };