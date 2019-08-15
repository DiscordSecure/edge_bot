module.exports = class Event {
    constructor(client) {
        this.client = client;
    };

    async run(...args) {
        try {
            return await this.run(...args);
        } catch (error) {
            return console.log(error);
        };
    };
};