const info = require('../config.json')
module.exports = class {
    constructor(rice) {
        this.rice = rice;
    }

    async run(rice) {

        console.log(`Logged in as ${this.rice.user.username}#${this.rice.user.discriminator}`)

        this.rice.editStatus({
            type: 2,
            name: 'rice help',
            status: 'online'
        });
        this.rice.executeWebhook(info.logid, info.logtoken, {
            username: 'Ready',

            embeds:[
                {
                    title: "Bot Is Ready",
                    description: `Bot <@${this.rice.user.id}> Is Ready\
                    \nPing: ${this.rice.shards.get(0).latency}\
                    \nStatus:  ${this.rice.shards.get(0).status}`
                }
                
            ]

            
        })
    }
}