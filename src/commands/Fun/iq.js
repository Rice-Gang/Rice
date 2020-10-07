const Command = require("../../core/Command");
const MessageEmbed = require("../../core/MessageEmbed");
class iq extends Command {
  constructor(rice) {
    super(rice, {
      name: "iq",
      category: "Fun",
      botPerms: ["sendMessages"],
      memberPerms: [],
      description: "Tells you your IQ",
    });
  }

  async run(message, args) {
    const result = Math.floor(Math.random() * 150);
    const Embed = new MessageEmbed();
    Embed.title = "IQ result";

    Embed.color = 0xfffffd;
    if (result < 100) {
      Embed.description = `You are Small Brain with an iq of ${result}.`;
      message.channel.send({ embed: Embed });
    }
    if (result >= 100) {
      Embed.description = `You are Big Brain with an iq of ${result}.`;
      message.channel.send({ embed: Embed });
    }
  }
}

module.exports = iq;
