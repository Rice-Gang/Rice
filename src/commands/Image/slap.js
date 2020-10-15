const Command = require("../../core/Command");
const find = require("../../core/Image/find");
const imgedit = require("../../core/Image/imgedit")


class Slap extends Command {
    constructor(rice) {
        super(rice, {
            name: "slap",
            category: "Image",
            botPerms: ["attachFiles"],
            description: "Slap someobe",
            usage: "slap [ user ]"
        });
    }

   
    async run(msg, args) {
        
        let img1 = msg.author.staticAvatarURL;
        let img2 = await find.find(msg, args, this.rice)
        if(img2 == false) return msg.channel.sendError("I beed to be given a user or an img foy you to slap")
        msg.channel.sendTyping()
        
        let file = await imgedit.slap(img1, img2)
        return msg.channel.send("", {file: file, name: "slap.png"})
    }
}

module.exports = Slap;