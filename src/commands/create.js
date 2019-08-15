const Discord = require("discord.js")
const backup = require("discord-backup"),
settings = {
    prefix: "."
};
    client = new Discord.Client()

module.exports = class cmds extends require("../structures/Command") {
    constructor(client) {
        super(client, {
            name: "create",
            description: "",
            category: "Backup",
            aliases: ["cr"],
            usage: []
        });
    };

    async run(client, message, args) {
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                return message.channel.send(":x: | T'a besoin d'être Admin nigga!");
            };
            // Créer la backup
            let msg = await message.channel.send('Création de la backup ...')
            backup.create(message.guild).then((backupID) => {
                msg.edit(`Backup crée Utilise: ${settings.prefix}load ${backupID}`)
            });
        };
    };