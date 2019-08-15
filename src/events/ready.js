const moment = require('moment');
const os = require('os');
require('moment-duration-format');

module.exports = class Ready extends require("../structures/Event") {
    constructor(args) {
        super(args, {
    	    name: "Ready"
        });
    };

    async run(client) {
        console.log("\x1b[33m","[WARN] Le Bot est maintenant connecté.");
        console.log("\x1b[0m"," ")
        client.user.setPresence({
            game: {
                name: '.help',
                type: "STREAMING",
                url: "https://www.twitch.tv/monstercat"
            }
        });
    };
};
