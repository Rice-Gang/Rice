const Command = require("../../core/Command");
const find = require("../../core/Image/find");
const imgedit = require("../../core/Image/imgedit")


class What extends Command {
    constructor(rice) {
        super(rice, {
            name: "what",
            category: "Image",
            botPerms: ["attachFiles"],
            memberPerms: [],
            description: "What you say",
            usage: "what [ user ]"
        });
    }

   
    async run(msg, args) {
        let lastimg = await find.find(msg, args, this.rice)
        if(lastimg == false) return msg.channel.sendError("I could not find a image in this channel")
        msg.channel.sendTyping()
        
        let file = await imgedit.what(lastimg)
        msg.channel.send("", {file: file, name: "what.png"})
    }
}

module.exports = What;