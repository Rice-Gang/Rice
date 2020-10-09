const Command = require("../../core/Command");

class Setnick extends Command {
  constructor(rice) {
    super(rice, {
      name: "setnick",
      category: "Misc",
      botPerms: ["manageNicknames"],
      memberPerms: [],
      description: "Change someones nickname",
    });
  }

  async run(message, args) {
    const user = message.mentions[0] || message.member.user;
    const member = await message.channel.guild.members.get(user.id);
    let nick;

    if (user.id == message.channel.guild.ownerID)
      return message.channel.send(
        `**${user.username}#${user.discriminator}** You can't change owner's nickname!`
      );

    const riceInServer = message.channel.guild.members.get(this.rice.user.id);

    let ricesRole = message.channel.guild.roles.get(riceInServer.highestRole)
      .position;

    let membersRole = message.channel.guild.roles.get(
      member.highestRole.position
    );

    console.log(ricesRole);
    console.log(membersRole);

    if (parseInt(ricesRole) <= parseInt(membersRole)) {
      return message.channel.send(
        `**${user.username}#${user.discriminator}** My highest role position is same / lower then that member's, I can't change their nickname.`
      );
    }

    if (user.id !== message.author.id) {
      nick = args.slice(1).join(" ");

      if (!nick) return message.channel.send(`Specify a nickname to set!`);
      if (nick.length > 32) nick = nick.slice(0, 32);

      if (!message.member.permission.has("manageNicknames"))
        return message.channel.send(
          `You need Manage Nicknames permission to change nickname of others!`
        );
      member.edit({ nick: nick });
      message.channel.send(
        `**${user.username}#${user.discriminator}**'s nickname set to ${nick}`
      );
    } else {
      nick = args.slice(0).join(" ");

      if (!nick) return message.channel.send(`Specify a nickname to set!`);
      if (nick.length > 32) nick = nick.slice(0, 32);

      member.edit({ nick: nick });
      message.channel.send(
        `**${user.username}#${user.discriminator}** I have set your nickname to ${nick}`
      );
    }
  }
}

module.exports = Setnick;
