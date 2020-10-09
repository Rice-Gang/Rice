const Command = require("../../core/Command");
const MessageEmbed = require("../../core/MessageEmbed");
let inline = true;
class EmbedTest extends Command {
  constructor(rice) {
    super(rice, {
      name: "embedtest",
      category: "Misc",
      botPerms: ["embedLinks"],
      memberPerms: ["sendMessages"],
      description: "Test Command for the MessageEmbed class",
    });
  }

  async run(message, args) {
    const Embed = new MessageEmbed()
      .setTitle('Woah this works!')
      .setDescription('Embed Builder with eris :)')
      .setColor(0xFFFFFd)
      .setTimestamp();
    message.channel.send({ embed: Embed });
  }
}

module.exports = EmbedTest;
//,
