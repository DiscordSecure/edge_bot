module.exports = class Function {
    constructor(client) {
        this.client = client;
    };

    fetchUsers(m, message) {
        if (!m) return undefined;
        var search = m.trim().toLowerCase();
        if (search === "") return undefined;
        var userUsername = message.guild.members.filter(e => e.user.username.toLowerCase().includes(search)).first();
        var userNickname = message.guild.members.filter(e => e.displayName.toLowerCase().includes(search)).first();
        var userTag = message.guild.members.filter(e => e.user.discriminator.toLowerCase().includes(search)).first();
        var userMention = message.guild.members.get(search.trim().replace(/\D/g, ""));
        var userID =  message.guild.members.get(search);
        return (!userMention ? undefined : userMention.user) || userID  || (!userTag ? undefined : userTag.user) || (!userUsername ? undefined : userUsername.user) || (!userNickname ? undefined : userNickname.user) || (search.split(" ")[0] !== "random" ? undefined : message.guild.members.random().user);
    };

    fetchChannels(m, message) {
        if (!m) return undefined;
        var search = m.trim().toLowerCase();
        if (search === "") return undefined;
        var channelName = message.guild.channels.filter(e => e.name.toLowerCase().includes(search)).first();
        var channelMention = message.guild.channels.get(search.replace(/\D/g, ""));
        var channelID = message.guild.channels.get(search);
        return (!channelMention ? undefined : channelMention) || channelID || (!channelName ? undefined : channelName);
    };

    fetchRoles(m, message) {
        if (!m) return undefined;
        var search = m.trim().toLowerCase();
        if (search === "") return undefined;
        var roleName = message.guild.roles.filter(e => e.name.toLowerCase().includes(search)).first();
        var roleMention = message.guild.roles.get(search.replace(/\D/g, ""));
        var roleID = message.guild.roles.get(search);
        return (!roleMention ? undefined : roleMention) || roleID || (!roleName ? undefined : roleName);
    };

    badWord(message) {
        const badWordList = [
           "apxmxejeo@488483jdjdj"
        ];
        const p = `-${message}-`.replace(/[, . 0 1 2 3 4 5 6 7 8 9 ~ ! = + * " ' ` / ? < > - _ & @ # $ ( ) ^ `   ]/g, "-").toLowerCase();
        for (var i in badWordList) {
            if (p.includes(`-${badWordList[i]}-`)) return true;
        };
        return false;
    };
};