module.exports = class {
    constructor(rice) {
        this.rice = rice;
    }

    async run(message) {
        try{
            const snipes = this.rice.snipes.get(message.channel.id) || [];

            snipes.unshift({
                tag: message.author.username,
                avatar: message.author.avatarURL,
                content: message.content
            });
    
            snipes.splice(10);
            this.rice.snipes.set(message.channel.id, snipes);
        }catch (err){
            //So it does not log an err when a message is deleted that is not in the cache
        }
        
    }
}