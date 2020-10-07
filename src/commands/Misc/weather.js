const Command = require("../../core/Command");
const weathers = require("weather-js");
const MessageEmbed = require("../../core/MessageEmbed");

class weather extends Command {
  constructor(rice) {
    super(rice, {
      name: "weather",
      category: "Misc",
      botPerms: ["sendMessages"],
      description: "Gets weather for specified location!",
    });
    this.client;
  }

  async run(message, args) {
    const search = args.join(" ");
    if (!args[0])
      return message.channel.send(
        message.author.mention + ", Weather for what location?"
      );
    await weathers.find({ search: search, degreeType: "F" }, function (
      error,
      result
    ) {
      if (error) return console.log(error);

      if (result === undefined || result.length === 0)
        return message.channel.send(`Never heard of ${search}.`);
      const current = result[0].current;
      const location = result[0].location;
      const embed = {
        title: `Weather forecast for ${current.observationpoint}`,
        color: 0xfffffd,
        timestamp: new Date(),
        fields: [
          {
            name: `Temperature:`,
            value: `${current.temperature}°F`,
            inline: true,
          },
          {
            name: `Timezone:`,
            value: `UTC${location.timezone}`,
            inline: true,
          },
          {
            name: `Wind:`,
            value: `${current.winddisplay}`,
            inline: true,
          },

          {
            name: `Day:`,
            value: `${current.shortday}`,
            inline: true,
          },
          {
            name: `Feels like:`,
            value: `${current.feelslike}°F`,
            inline: true,
          },
          {
            name: `Humidity:`,
            value: `${current.humidity}%`,
            inline: true,
          },
        ],
      };

      message.channel.send({ embed: embed });
    });
  }
}

module.exports = weather;
