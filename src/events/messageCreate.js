const data = {};


module.exports = class {
    constructor(rice) {
        this.rice = rice;
    }

    async run(message) {

        const developers = ['699312838455459911', '423687326405885957', '657191205968543764', '329220047824486400', '521677874055479296', '373293135704621077', '695520751842885672', '515204641450098704', '342314924804014081']

        data.guild = await this.rice.guild(message.channel.guild.id);

        if (message.channel.guild === undefined) return;
        if (message.author.bot) return;

        const prefix = data.guild.prefix ? data.guild.prefix : 'rice ';

        const prefixRegex = new RegExp(`^(<@!?${this.rice.user.id}>)\\s*`);
        if (prefixRegex.test(message.content)) return message.channel.send(`My prefix in here is \`${prefix}\``);

        if (!message.content.toLowerCase().startsWith(prefix)) return;

        const msg = message.cleanContent.toLowerCase().split(' ');
        const cmd = msg[1];
        const args = msg.slice(2);

        const command = this.rice.commands.get(cmd) || this.rice.commands.get(this.rice.aliases.get(cmd));

        if (!command) return;

        if (command.help.category === 'Developer' && !developers.includes(message.author.id)) return;

        
        const cooldown = this.rice.cooldown;
        if(cooldown.has(`${message.author.id}_${command.help.name}`)){
            return message.channel.sendError(`You are still in cooldown for this command\
            \nCooldown: ${command.config.cooldown / 1000} Second(s)`)
        }else{
            if(!developers.includes(message.author.id)){
                this.rice.cooldown.add(`${message.author.id}_${command.help.name}`)
                setTimeout(() => {
                    this.rice.cooldown.delete(`${message.author.id}_${command.help.name}`)
                }, command.config.cooldown);
            }
        }
       
        if (message.channel.guild) {
            let Member_perms = []
            let Rice_perms = []
            
            let rice_tocheck = command.config.botPerms;
            let member_tocheck = command.config.memberPerms;

            let bot_perms = message.channel.guild.members.find(x => x.id == this.rice.user.id).permission
            let member_perms = message.channel.guild.members.find(x => x.id == message.author.id).permission

            member_tocheck.forEach(perm => {
                if(!member_perms.has(perm)) Member_perms.push(perm)
            })
            if(!Member_perms.length == 0) return message.channel.sendError(`Looks like you are missing some permissions for that command! Here they are: ${Member_perms.map((p) => `\`${p}\``).join(', ')}`)

            rice_tocheck.forEach(perm => {
                if(!bot_perms.has(perm)) Rice_perms.push(perm)
            })
            if(!Rice_perms.length == 0) return message.channel.send(`Looks like I am missing some permissions for that command! Here they are: ${Rice_perms.map((p) => `\`${p}\``).join(', ')}`)
        }

        try {
            command.run(message, args, data);
        } catch (err) {
            console.log(err);
        }
    }
}