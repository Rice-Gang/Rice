const Command = require("../../core/Command");
const find = require("../../core/Image/find");
const imgedit = require("../../core/Image/imgedit");

class Sepia extends Command {
  constructor(rice) {
    super(rice, {
      name: "changemymind",
      category: "Image",
      botPerms: ["attachFiles"],
      memberPerms: [],
      description: "Changemymind meme template",
      usage: "changemymind < text >",
    });
  }

  async run(msg, args) {
    let text = args.join(" ");
    msg.channel.sendTyping();

    let file = await imgedit.changemymind(text);
    msg.channel.send("", { file: file, name: "changemymind.png" });
  }
}
//p
module.exports = Sepia;
