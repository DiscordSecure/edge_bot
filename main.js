const {
    Client,
    Collection
} = require("discord.js");
const FUNCTION = require("./src/utils/function");
const fs = require("fs");

module.exports = new class extends Client {
    constructor() {
        super();
        this.commands = new Collection();
        this.aliases = new Collection();
        this.config = require("./config");
        this.function = new FUNCTION(this);
        this.data = {};
        this.launch();
    };

    launch() {
        this.loadCommands();
        this.loadEvents();
        this.loadDatas();
        this.login(this.config.TOKEN);
    };

    loadCommands() {
        return fs.readdir("./src/commands", (err, files) => {
            if (err) console.log(err);
            let file = files.filter(f => f.split(".").pop() === "js");
            if (!file || file.length === 0) return console.log("Aucune commande dans le dossier commande.");
            return file.forEach(f => {
                const FILE = require(`./src/commands/${f}`);
                if (typeof FILE !== "function") return;
                const command = new FILE(this);
                console.log("\x1b[32m", `[COMMAND LOAD] ==> | ${command.name}`, "\x1b[0m");
                this.commands.set(command.name, command);
                if (command && command.aliases) return command.aliases.forEach((a, i) => this.aliases.set(command.aliases[i], command));
            });
        });
    };

    loadEvents() {
        return fs.readdir("./src/events", (err, files) => {
            if (err) console.log(err);
            let file = files.filter(f => f.split(".").pop() === "js");
            if (!file || file.length === 0) return console.log("Aucun event dans le dossier event.");
            return file.forEach(f => {
                const FILE = require(`./src/events/${f}`);
                if (typeof FILE !== "function") return;
                const event = new FILE(this);
                console.log("\x1b[35m", `[EVENT LOAD] ==> | ${f}`, "\x1b[0m");
                return this.on(f.split(".").shift(), (...args) => event.run(this, ...args));
            });
        });
    };

    loadDatas() {
        return fs.readdir("./src/data", (err, files) => {
            if (err) console.log(err);
            let file = files.filter(f => f.split(".").pop() === "json");
            if (!file || file.length === 0) return console.log("Aucune base de données dans le dossier data.");
            return file.forEach(f => {
                const FILE = require(`./src/data/${f}`);
                if (typeof FILE !== "object") return;
                console.log("\x1b[34m", `[DATA LOAD] ==> | ${f}`, "\x1b[0m");
                return this.data[f.split(".").shift()] = FILE;
            });
        });
    };
};