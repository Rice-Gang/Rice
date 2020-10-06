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
        let chan = args.join(" ")
        if (!chan) {
          return message.channel.send("You must provide a channel name!")
        } else
        if (guild.channels.find(c => c.name === chan)) {
          message.channel.send("That channel already exists!").then(message => setTimeout(() => {
              message.delete()
          }, 5000 ));
          return;
        } else {
          guild.createChannel(chan);
          return message.channel.send(`I have created ${chan} channel for you!`).then(message => setTimeout(() => {
            message.delete()
        }, 5000 ));
    
        }

        
    }
}

module.exports = NewChannel;