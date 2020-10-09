const Command = require("../../core/Command");

class Howgay extends Command {
  constructor(rice) {
    super(rice, {
      name: "howgay",
      category: "Fun",
      botPerms: [],
      memberPerms: [],
      description: "See how gay someone is",
    });
  }

  async run(message, args) {
    const member = message.mentions[0];
    const author = message.author;

    if (!args[0]) {
      return message.channel.send(
        "You are " + Math.floor(Math.random() * 12) + 5 + "% gay."
      );
    } else {
      message.channel.send(
        `<@${member.id}> is ` + Math.floor(Math.random() * 12) + 5 + "% gay."
      );
    }
  }
}

module.exports = Howgay;
