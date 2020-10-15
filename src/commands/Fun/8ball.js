const Command = require("../../core/Command");
const fetch = require("node-fetch");
const got = require("got");
const jimp = require("jimp");

class Ball extends Command {
    constructor(rice) {
        super(rice, {
          name: "8ball",
          category: "Fun",
          botPerms: ["attachFiles"],
          description: "8ball",
        });
      }
    

      async run(msg, args) {
        msg.channel.sendTyping();
        got("https://nekos.life/api/v2/8ball").then((r) => {
          (async () => {
            let content = JSON.parse(r.body);
            let img = await jimp.read(content.url);
            img.resize(400, 400);
            let final = await img.getBufferAsync("image/png");
            msg.channel.send("", { file: final, name: "8ball.png" });
          })();
        });
      }
    }

module.exports = Ball;