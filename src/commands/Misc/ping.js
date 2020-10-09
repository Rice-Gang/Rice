const Command = require("../../core/Command");

class Ping extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      category: "Misc",
      aliases: ["pinger"],
      description: "View the bot ping...",
    });
  }

  async run(message, args) {
    return message.channel.send(
      `Pong! ${message.channel.guild.shard.latency}ms`
    );
  }
}

module.exports = Ping;
