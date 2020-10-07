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
            //So it no log del msg tht is no in cache :0
        }
        
    }
}