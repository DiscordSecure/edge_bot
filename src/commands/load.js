const Discord = require("discord.js")
const backup = require("discord-backup"),
settings = {
    prefix: "."
};
    client = new Discord.Client()

module.exports = class cmds extends require("../structures/Command") {
    constructor(client) {
        super(client, {
            name: "load",
            description: "",
            category: "Backup",
            aliases: ["lo"],
            usage: []
        });
    };

    async run(client, message, args) {
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send(":x: | Tu a besoin d'être Admin nigga!");
        }
        const backupID = args.join(" ");
        if (!backupID) {
            return message.channel.send(":x: | Tu dois spécifier un ID de backup valide!");
        }
        
        backup.fetch(backupID).then(async () => {
            
            message.channel.send(`:warning: | Pour commencer à charger la sauvegarde \`\`confirmer\`\`!`);
            await message.channel.awaitMessages(m => (m.author.id === message.author.id) && (m.content === "confirmer"), {
                max: 1,
                time: 20000,
                errors: ["time"]
            }).then(() => {
                message.author.send(`:white_check_mark: | \`\`Commence à charger la backup!\`\``);
                backup.load(backupID, message.guild).then(() => {
                    message.author.send(`\`\`Backup finie\`\``)
                }).catch((err) => {
                    return message.author.send(":x: | Désolé, une erreur s'est produite... veuillez vérifier si j'ai les droits d'administrateur!");
                });
            }).catch((err) => {
                return message.channel.send(":x: | Le temps est écoulé, annulant le chargement des sauvegardes!");
            });
        }).catch((err) => {
            return message.channel.send(":x: | Aucune sauvegarde trouvée `" + backupID + "`!");
        });
    };
    };