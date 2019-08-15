const Discord = require("discord.js")
const backup = require("discord-backup"),
settings = {
    prefix: "."
};
    client = new Discord.Client()

module.exports = class cmds extends require("../structures/Command") {
    constructor(client) {
        super(client, {
            name: "info",
            description: "",
            category: "Backup",
            aliases: ["i"],
            usage: []
        });
    };

    async run(client, message, args) {
        let backupID = args[0];
        if(!backupID){
            return message.channel.send(":x: | Met un ID de backup valide!");
        }
        // Fetch the backup
        backup.fetch(backupID).then((backupInfos) => {
            let embed = new Discord.MessageEmbed()
                .setAuthor("Backup Infos")
                // Display the backup ID
                .addField("ID", backupInfos.ID, true)
                // Displays the server from which this backup comes
                .addField("Serveur", backupInfos.server, true)
                // Display the size (in mb) of the backup
                .addField("Data", backupInfos.size, true)
                // Display when the backup was created
                .addField("Crée le", timeConverter(backupInfos.createdTimestamp), true)
                .setColor("#FF0000");
            message.channel.send(embed);
        }).catch((err) => {
            return message.channel.send(":x: | Aucune backup pour: `"+backupID+"`!" + "Error: " + err);
        });
    };
    };

    function timeConverter(t) {
        var a = new Date(t);
        var today = new Date();
        var yesterday = new Date(Date.now() - 86400000);
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        if (a.setHours(0,0,0,0) == today.setHours(0,0,0,0))
            return "today, " + hour + ":" + min;
        else if (a.setHours(0,0,0,0) == yesterday.setHours(0,0,0,0))
            return "yesterday, " + hour + ":" + min;
        else if (year == today.getFullYear())
            return date + " " + month + ", " + hour + ":" + min;
        else
            return date + " " + month + " " + year + ", " + hour + ":" + min;
    }