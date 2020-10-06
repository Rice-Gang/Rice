const info = require('../config.json')
module.exports = class {
    constructor(rice) {
        this.rice = rice;
    }

    async run(rice) {
        this.rice.executeWebhook(info.logid, info.logtoken, {
            username: 'Disconnect',

            embeds:[
                {
                    title: "Bot Disconnected",
                    description: `Bot <@${this.rice.user.id}> Has Disconnected\
                    \nStatus:  ${this.rice.shards.get(0).status}\
                    \nConeection Checks Every: ${info.connectionchecks / 1000} Seconds`
                }
                
            ]

            
        })
    }
}