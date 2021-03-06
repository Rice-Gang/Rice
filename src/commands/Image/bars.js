const Command = require("../../core/Command");
const find = require("../../core/Image/find")
const imgedit = require("../../core/Image/imgedit")


class Bars extends Command {
    constructor(rice) {
        super(rice, {
            name: "bars",
            aliases: ["jail"],
            category: "Image",
            botPerms: ["attachFiles"],
            description: "Place bars over a image",
            usage: "bars [ user ]"
        });
    }

   
    async run(msg, args) {
        let lastimg = await find.find(msg, args, this.rice)
        if(lastimg == false) return msg.channel.sendError("I could not find a image in this channel")
        msg.channel.sendTyping()
        
        let file = await imgedit.bars(lastimg)
        msg.channel.send("", {file: file, name: "bars.png"})
    }
}

module.exports = Bars;