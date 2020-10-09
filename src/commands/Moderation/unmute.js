const Command = require("../../core/Command");
const serverData = require("../../helpers/models/Guild");
class Unmute extends Command {
  constructor(rice) {
    super(rice, {
      name: "unmute",
      category: "Moderation",
      botPerms: ["manageRoles"],
      memberPerms: ["manageMessages"],
      description: "Mute a specific member",
    });
  }

  async run(message, args) {
    const authorTag = `${message.author.username}#${message.author.discriminator}`;

    if (!args[0])
      return error(`**${authorTag}** Specify a valid member to unmute!`);

    const memberToMute =
      message.mentions ||
      this.rice.users.get(args[0]) ||
      this.rice.users.find((u) => u.username == args[0]);

    if (
      !memberToMute[0] ||
      !message.channel.guild.members.get(memberToMute[0].id)
    )
      return error(`**${authorTag}** Specify a valid member to unmute!`);

    if (memberToMute[0].id == message.author.id)
      return error(`**${authorTag}** You are not muted`);

    const targetTag = `${memberToMute[0].username}#${memberToMute[0].discriminator}`;

    const server = await serverData.findOne({ id: message.channel.guild.id });

    let muteRole = await message.channel.guild.roles.get(server.muteRole);

    if (!muteRole) return error(`**${targetTag}** Isn't muted!`);

    if (
      !message.channel.guild.members
        .get(memberToMute[0].id)
        .roles.find((r) => r == muteRole.id)
    )
      return error(`**${targetTag}** Isn't muted!`);

    await message.channel.guild.members
      .get(memberToMute[0].id)
      .removeRole(muteRole.id);

    message.channel.send({
      embed: {
        description: `<:yes:762884751832252417> **${targetTag}** has been unmuted by **${authorTag}**`,
        color: 0x3cb474,
      },
    });

    function error(text) {
      message.channel.send({
        embed: {
          description: `<:no:762884741069275156> ${text}`,
          color: 0x0ff4949,
        },
      });
    }
  }
}

module.exports = Unmute;
