const Command = require('../../core/Command');
const MessageEmbed = require('../../core/MessageEmbed');
class EmbedTest extends Command {
    constructor(rice) {
        super(rice, {
            name: 'embedtest',
            category: 'Misc',
            botPerms: ['embedLinks'],
            memberPerms: ['sendMessages'],
            description: 'Test Command for the MessageEmbed class'
        });
    }

    async run(message, args) {
        const Embed = new MessageEmbed()
            .setTitle('Some title')
            .setColor(0xFFFFFd)
            .setURL('https://discord.js.org/')
            .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
            .setDescription('Some description here')
            .setThumbnail('https://i.imgur.com/wSTFkRM.png')
            .addFields([
                { name: 'Regular field title', value: 'Some value here', inline: false},
                { name: '\u200B', value: '\u200B' },
                { name: 'Inline field title', value: 'Some value here', inline: true},
                { name: 'Inline field title', value: 'Some value here', inline: true},
            ])
            .addField('Inline field title', 'Some value here', true)
            .setImage('https://i.imgur.com/wSTFkRM.png')
            .setTimestamp()
            .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
            console.log(Embed)
        message.channel.send({ embed: Embed });
    }
}

module.exports = EmbedTest;
//,
