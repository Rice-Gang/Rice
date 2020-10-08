const Command = require('../../core/Command');
const os = require('os')
const core = os.cpus()[0];


class Sstats extends Command {
    constructor(rice) {
        super(rice, {
            name: 'server-stats',
            aliases: ['sstats', 'server-info', 'serverinfo','si', 'server'],
            category: 'Info',
            botPerms: ['embedLinks'],
            memberPerms: ['sendMessages'],
            description: 'Shows info on a user',
            usage: `user-stats [ user ]`
        });
    }

    async run(msg, args) {
        const server = msg.channel.guild;
        const embed = {
            title: `${server.name}, ${server.id}`,
            thumbnail: { url: server.iconURL },
            fields: [],
            color: 0xFFFFFd,
        };
        let mfa = 'True'
        if(server.mfaLevel == '0') mfa = 'False'

        let verlvl = 'None'
        if(server.verificationLevel == 1) verlvl = 'Verified email'
        if(server.verificationLevel == 2) verlvl = 'Verified email, 5 Mins'
        if(server.verificationLevel == 3) verlvl = 'Verified email, 10 Mins'
        if(server.verificationLevel == 4) verlvl = 'Verified phone, 10 Mins'

        embed.fields.push({name: `Owner`, value: `<@${server.ownerID}>`, inline: true})
        embed.fields.push({name: `Region`, value: server.region, inline: true})
        embed.fields.push({name: `Require mfaLevel (for admins)`, value: mfa, inline: true})

        

        embed.fields.push({name: 'Verification level', value: verlvl, inline: true})
        embed.fields.push({name: `Boost level`, value: server.premiumTier, inline: true})
        embed.fields.push({name: `Boost count`, value: server.premiumSubscriptionCount, inline: true})

        
        const created = server.createdAt;

        msg.channel.send({embed: embed})
    }
}


module.exports = Sstats;
