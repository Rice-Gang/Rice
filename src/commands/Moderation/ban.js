const { Collection } = require("eris");
const Command = require("../../core/Command");

class Ban extends Command {
  constructor(rice) {
    super(rice, {
      name: "ban",
      category: "Moderation",
      botPerms: ["banMembers"],
      memberPerms: ["banMembers"],
      description: "Ban a specific member",
      usage: "ban < user >",
    });
  }

  async run(message, args) {
    const authorTag = `${message.author.username}#${message.author.discriminator}`;
    const userMentions =
      message.mentions[0] ||
      this.rice.users.get(args[0]) ||
      this.rice.users.find((x) => x.username == args[0]);
    if (!userMentions || !message.channel.guild.members.get(userMentions.id)) {
      return message.channel.send({
        embed: {
          description: `<:no:762884741069275156> **${authorTag}** Provide a valid member to ban.`,
          color: 0xff4949,
        },
      });
    }

    if (userMentions.id == message.author.id) {
      return message.channel.send({
        embed: {
          description: `<:no:762884741069275156> **${authorTag}** You can't ban yourself.`,
          color: 0xff4949,
        },
      });
    }
    const memberToBan = message.channel.guild.members.get(userMentions.id);

    const highestAuthorRole = Math.max.apply(
      Math,
      message.member.roles.map((x) => {
        return x.position;
      })
    );
    const highestTargetRole = Math.max.apply(
      Math,
      memberToBan.roles.map((e) => {
        return e.position;
      })
    );

    if (
      parseInt(highestAuthorRole) <= parseInt(highestTargetRole) &&
      message.author.id != message.channel.guild.ownerID
    ) {
      return message.channel.send({
        embed: {
          description: `<:no:762884741069275156> **${authorTag}** You can't ban that member!`,
          color: 0xff4949,
        },
      });
    }
    //<:yes:762884751832252417>
    if (memberToBan.user.id == message.channel.guild.ownerID) {
      return message.channel.send({
        embed: {
          description: `<:no:762884741069275156> **${authorTag}** You can't ban the server owner!`,
          color: 0xff4949,
        },
      });
    }
    const reason = args.slice(1).join(" ");
    const targetTag = `${memberToBan.user.username}#${memberToBan.user.discriminator}`;
    await memberToBan
      .ban()
      .then(() => {
        return message.channel.send({
          embed: {
            description: `<:yes:762884751832252417> **${targetTag}** Has been banned by ${authorTag}\nReason: ${
              reason || "No Reason Provided"
            }`,
            color: 0x3cb474,
          },
        });
      })
      .catch((e) => {
        return message.channel.send({
          embed: {
            description: `<:no:762884741069275156> Something went wrong... I couldn't ban **${targetTag}**`,
            color: 0xff4949,
          },
        });
      });
  }
}

module.exports = Ban;
