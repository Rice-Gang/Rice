const Command = require("../../core/Command");
const serverData = require("../../helpers/models/Guild");
class Mute extends Command {
    constructor(rice) {
        super(rice, {
            name: "mute",
            category: "Moderation",
            botPerms: ["manageRoles"],
            memberPerms: ["manageMessages"],
            description: "Mute a specific member"
        });
    }

    async run(message, args) {

        const authorTag = `${message.author.username}#${message.author.discriminator}`;

        if (!args[0]) return error(`**${authorTag}** Specify a valid member to mute!`);

        const memberToMute = message.mentions || this.rice.users.get(args[0]) || this.rice.users.find(u => u.username == args[0]);

        if (!memberToMute[0] || !message.channel.guild.members.get(memberToMute[0].id)) return error(`**${authorTag}** Specify a valid member to mute!`);

        if (memberToMute[0].id == message.author.id) return error(`**${authorTag}** You can mute yourself!`);

        const highestAuthorRole = Math.max.apply(Math, message.member.roles.map((x) => {
            return x.position;
        }));
        const highestTargetRole = Math.max.apply(Math, message.channel.guild.members.get(memberToMute[0].id).roles.map((x) => {
            return x.position;
        }));

        if (highestAuthorRole <= highestTargetRole && message.author.id != message.channel.guild.ownerID) return error(`**${authorTag}** You can't mute that member!`);

        const reason = args.slice(1).join(" ");

        const targetTag = `${memberToMute[0].username}#${memberToMute[0].discriminator}`;

        const server = await serverData.findOne({ id: message.channel.guild.id });

        let muteRole = await message.channel.guild.roles.get(server.muteRole);
        
        if (!muteRole) {
            muteRole = await message.channel.guild.createRole({ name: "Muted", color: 0xA8A8A8, mentionable: false, permissions: 0 });
            server.muteRole = muteRole.id;
            await server.save();
        }

        if (message.channel.guild.members.get(memberToMute[0].id).roles.find(r => r == muteRole.id)) return error(`**${targetTag}** Is already muted!`);

        await message.channel.guild.members.get(memberToMute[0].id).addRole(muteRole.id);

        message.channel.send({ embed: { description: `<:yes:762884751832252417> **${targetTag}** has been muted by **${authorTag}**\nReason: ${reason || "No Reason Provided."}`, color: 0x3cb474 } });

        memberToMute.getDMChannel().then(x => x.createMessage(`You have been muted in ${message.channel.guild.name} for ${reason}.`));
        
        message.channel.guild.channels.forEach(c => {
            if (!c.permissionsOf(this.rice.user.id).has("readMessages")) return;
            else c.editPermission(muteRole.id, 0, 2048, "role");
        }); 

        function error(text) {
            message.channel.send({ embed: { description: `<:no:762884741069275156> ${text}`, color: 0x0ff4949 } })
        }

    }
}

module.exports = Mute;