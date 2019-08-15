const {RichEmbed} = require("discord.js");

module.exports = class cmds extends require("../structures/Command") {
    constructor(client) {
        super(client, {
            name: "help",
            description: "",
            category: "Help",
            aliases: ["h"],
            usage: [],
        });
    };

    async run(client, message, args) {
        let categories = [];
        const helpEmbed = new RichEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setDescription("• Les éléments entre [] sont obligatoires.\n• Les éléments entre () sont facultatifs.")
            .setThumbnail(client.user.displayAvatarURL)
            .setColor("RANDOM")
        await client.commands.filter(c => c.category !== " ").forEach(async(c) => {
            if (!categories.includes(c.category)) await categories.push(c.category);
        });
        await categories.sort().map(async(c) => {
            helpEmbed.addField(`${c} (${client.commands.filter(cmd => cmd.category === c).size})`, await client.commands.filter(cmd => cmd.category === c).map(cmd => `\`${cmd.name}\``).join(", "), false)
        });
        return args[0] !== "here" ? message.channel.send(`Une page d'aide vous a été envoyé, regardez dans vos messages privés !`).then(message.author.send(helpEmbed).catch(() => undefined)) : message.channel.send(helpEmbed);
    };
};