const Command = require("../../core/Command");
const MessageEmbed = require("../../core/MessageEmbed");
const jokes = require("jokeslol");
class dadjoke extends Command {
  constructor(rice) {
    super(rice, {
      name: "dadjoke",
      category: "Fun",
      botPerms: ["sendMessages"],
      memberPerms: [],
      description: "Gets a funny Dad Joke",
    });
  }

  async run(message, args) {
    jokes.DadJoke(function (joke) {
      console.log(joke);
      return message.channel.send(joke);
    });
  }
}

module.exports = dadjoke;
