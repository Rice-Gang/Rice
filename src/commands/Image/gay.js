const Command = require("../../core/Command");
const find = require("../../core/Image/find");
const imgedit = require("../../core/Image/imgedit");

class Gay extends Command {
  constructor(rice) {
    super(rice, {
      name: "gay",
      aliases: [],
      category: "Image",
      botPerms: ["attachFiles"],
      memberPerms: [],
      description: "Overly the raibow over a image",
      usage: `gay [ user ]`,
    });
  }

  async run(msg, args) {
    let lastimg = await find.find(msg, args, this.rice);
    if (lastimg == false)
      return msg.channel.sendError("I could not find a image in this channel");
    msg.channel.sendTyping();

    let file = await imgedit.gay(lastimg);
    msg.channel.send("", { file: file, name: "bars.png" });
  }
}

module.exports = Gay;
