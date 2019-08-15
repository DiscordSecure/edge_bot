module.exports = class Command {
    constructor(client, options) {
        this.client = client;
        this.name = options.name;
        this.description = options.description || "Aucune description.";
        this.aliases = options.aliases || "Aucun aliase";
        this.usage = options.usage || "Aucune utilisation indiquée.";
        this.category = options.category || "Aucune catégorie.";
    };
};