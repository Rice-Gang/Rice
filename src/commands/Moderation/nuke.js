const { Collection } = require("eris");
const Command = require("../../core/Command");

class Channelnuke extends Command {
  constructor(rice) {
    super(rice, {
      name: "nuke",
      aliases: ["c-nuke", "channel-nuke", "channel-c"],
      category: "Moderation",
      botPerms: ["manageChannels", "manageMessages"],
      memberPerms: ["manageChannels", "manageMessages"],
      description: "Delete every message in a channel by cloning it",
      usage: "channelnuke",
    });
  }

  async run(msg, args) {
    try {
      let position = msg.channel.position;
      let parent = msg.channel.parentID;
      let type = msg.channel.type;
      let name = msg.channel.name;
      let topic = msg.channel.topic;
      let nsfw = msg.channel.nsfw;
      let overwrites = msg.channel.permissionOverwrites;
      let rateLimit = msg.channel.rateLimitPerUser;
      let overs = [];
      overwrites.forEach((o) => {
        overs.push(o);
      });

      msg.channel.delete("Nuke command");
      let newchannel = await this.rice.createChannel(msg.guildID, name, type, {
        topic: topic,
        nsfw: nsfw,
        parentID: parent,
        rateLimitPerUser: rateLimit,
        permissionOverwrites: overs,
        reason: `My nuke commands was used by ${msg.author.username}`,
      });
      await this.rice.editChannelPosition(newchannel.id, position);
      newchannel.send({
        embed: {
          title: `Channel nuked by ${msg.author.username}#${msg.author.discriminator}`,
          description: `Name ${name}\
                    \nTopic ${topic || "None"}\
                    \nTotal overwrites ${overs.length}\
                    \nSlowmode ${rateLimit}\
                    \nNsfw ${nsfw}`,
          color: 0x0ff4949,
          image: {
            url: "https://media.giphy.com/media/HhTXt43pk1I1W/giphy.gif",
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Channelnuke;
