const Command = require('../../core/Command');
const serverData = require('../../helpers/models/Guild');
class Mute extends Command {
    constructor(rice) {
        super(rice, {
            name: 'mute',
            category: 'Moderation',
            botPerms: [''],
            memberPerms: [],
            description: ''
        });
    }

    async run(message, args) {

        const authorTag = `${message.author.username}#${message.author.discriminator}`;

        const memberToMute = message.mentions;

        if (!memberToMute[0] || !message.channel.guild.members.get(memberToMute[0].id)) error(`**${authorTag}** Specify a valid member to mute!`);

        if (memberToMute.user.id == message.author.id) return error(`**${authorTag}** You can mute yourself!`);
        
        const highestAuthorRole = Math.max.apply(Math, message.member.roles.map((x) => {
            return x.position;
        }));
        const highestTargetRole = Math.max.apply(Math, message.channel.guild.members.get(memberToMute[0].user.id).roles.map((x) => {
            return x.position;
        }));

        if (highestAuthorRole <= highestTargetRole && message.author.id != message.channel.guild.ownerID) return error(`**${authorTag}** You can't mute that member!`);

        const reason = args.slice(1).join(' ');

        const targetTag = `${memberToMute.user.username}#${memberToMute.user.discriminator}`;

        const server = await serverData.findOne({ id: message.channel.guild.id });

        let muteRole = message.channel.guild.roles.get(server.muteRole);

        if (memberToMute.roles.find(r => r.id == muteRole)) return error(`**${targetTag}** Is already muted!`);

        if (!muteRole) {
            muteRole = await message.channel.guild.createRole(`Muted`, { color: 0xA8A8A8, mentionable: false, permissions: [] });
            data.muteRole = muteRole.id;
        }

        await memberToMute.addRole(muteRole.id);

        message.channel.send(`<:yes:762884751832252417> **${targetTag}** has been muted by **${authorTag}**\nReason: ${reason ?? 'No Reason Provided.'}`);

        function error(text) {
            message.channel.send({ embed: { description: `<:no:762884741069275156> ${text}` }, color: 0xff4949 })
        }
        
    }
}

module.exports = Mute;