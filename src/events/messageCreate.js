let config = {};
const PREFIX = require('../models/prefix')

module.exports = class {
    constructor(rice) {
        this.rice = rice;
    }

    async run(message) {
        let data = await PREFIX.findOne({guildID: message.channel.guild.id})


        const developers = ['699312838455459911', '423687326405885957', '329220047824486400', '521677874055479296', '373293135704621077', '695520751842885672', '515204641450098704']

        if (message.channel.guild === undefined) return;
        if (message.author.bot) return;

        var prefix
        
        if(data){
            prefix = data.prefix;
            console.log(data.prefix)
        }else{
            prefix = 'rice ';
        }

        


        if (!message.content.toLowerCase().startsWith(prefix)) return;

        const msg = message.cleanContent.toLowerCase().split(' ');
        const cmd = msg[1];
        const args = msg.slice(2);

        const command = this.rice.commands.get(cmd) || this.rice.commands.get(this.rice.aliases.get(cmd));

        if (!command) return;

        if (command.help.category === 'Developer' && !developers.includes(message.author.id)) return;


        /*Perm checks*/
        let memberperms = command.config.memberPerms;
        let memberpermsstring = memberperms.join(', ')
        let member_do_return = false
        memberperms.forEach(perm => {
            if(!message.member.permission.has(perm)) member_do_return = true;
        })
        if(member_do_return == true){
            return message.channel.send({
                embed: {
                    title:'Missing permission(s)',
                    description: `Permission(s) needed: ${memberpermsstring}`,
                    color: 0xFFFFFd
                }
            })
        }
        
        let botperms = command.config.botPerms;
        let botpermsstring = memberperms.join(', ')
        let bot_do_return = false;
        let botmemberperms = message.channel.guild.members.find(x => x.id == this.rice.user.id).permission;
        if(!botmemberperms.has('embedLinks')){
            try{
                return this.rice.getDMChannel(message.author.id).then(ch => {
                    ch.createMessage(`I do not have embedLinks permission in **${message.channel.guild.name}** Please tell a admin to give me embedLinks or if you are a admin you could give me the permission to embedLinks`)
                })
            }catch(err){
                return;
            }
            
        }
        botperms.forEach(perm => {
            if(!botmemberperms.has(perm)) bot_do_return = true;
        })
        if(bot_do_return == true){
            return message.channel.send({
                embed: {
                    title:'Missing bot permission(s)',
                    description: `Permission(s) needed: ${botpermsstring}`,
                    color: 0xFFFFFd
                }
            })
        }
        /*Perm checks*/


        try {
            command.run(message, args, developers);
        } catch (err) {
            console.log(err);
        }
    }
}