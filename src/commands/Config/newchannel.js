const Command = require('../../core/Command');

class NewChannel extends Command {
  constructor(rice) {
    super(rice, {
      name: 'newchannel',
      category: 'Config',
      botPerms: ['embedLinks'],
      memberPerms: ['manageChannels'],
      description: 'Creates a new channel for the guild.'
    });
  }

  async run(message, args, developers) {

    //message.delete()
    let guild = message.channel.guild;
    let chan = args[0]
    let cat = args[1];

    if (!chan) {
      return message.channel.send({
        embed: {
          title: "<:no:762884741069275156>You must provide a channel name!",
          color: 0xFFFFFd
        }
      }).then(message => setTimeout(() => {
        message.delete()
      }, 5000));
    } else
      if (guild.channels.find(c => c.name === chan)) {
        return message.channel.send({
          embed: {
            title: "<:no:762884741069275156>That channel already exists!",
            color: 0xFFFFFd
          }
        }).then(message => setTimeout(() => {
          message.delete()
        }, 5000));

      } else {
        if (!cat) {
          guild.createChannel(chan);
          return message.channel.send({
            embed: {
              title: `<:yes:762884751832252417>I have created \`${chan}\` channel for you!`,
              color: 0xFFFFFd
            }
          }).then(message => setTimeout(() => {
            message.delete()
          }, 5000));
        } else {
          if (isNaN(cat)) return message.channel.send({
            embed: {
              title: '<:no:762884741069275156>You must provide a category id.',
              color: 0xFFFFFd
            }
          }).then(message => setTimeout(() => {
            message.delete()
          }, 5000))

          guild.createChannel(chan).then((chan) => {
            chan.edit({ parentID: cat })
            return message.channel.send({
              embed: {
                title: `<:yes:762884751832252417>I have created \`${chan.name}\` within that category for you!`,
                color: 0xFFFFFd
              }
            }).then(message => setTimeout(() => {
              message.delete()
            }, 5000));
          })



        }


      }


  }
}

module.exports = NewChannel;