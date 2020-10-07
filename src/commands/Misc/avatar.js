const Command = require('../../core/Command');
const fetch = require('node-fetch')

class Avatar extends Command {
    constructor(rice) {
        super(rice, {
            name: 'avatar',
            aliases: ['av', 'pfp'],
            category: 'Misc',
            botPerms: ['embedLinks'],
            memberPerms: ['sendMessages'],
            description: 'shows a user\'s avatar',
            usage: `avatar [ user | fetch ] [ user ]`
        });
    }

    async run(msg, args) {
        
        const user = msg.mentions[0] || msg.channel.guild.members.find(x => x.username.toLowerCase() == args.join(' ').toLowerCase()) || this.rice.users.find(x => x.id == args[0])
        
        
        if(args[0] == 'fetch'){
            
            msg.channel.sendTyping()
            const fetchuser = msg.mentions[0] || msg.channel.guild.members.find(x => x.username.toLowerCase() == args.join(' ').slice(args[0].length + 1).toLowerCase()) || this.rice.users.find(x => x.id == args[1])
            if(!fetchuser){

                let res = await fetch(msg.author.avatarURL)
                let img = await res.buffer()
                let end = 'png'
                if(msg.author.avatarURL.includes('gif')) end = 'gif'
                

                msg.channel.send('', {file: img, name: `${msg.author.username}_av.${end}`})
            }else{
                let res = await fetch(fetchuser.avatarURL)
                let img = await res.buffer()
                let end = 'png'
                if(fetchuser.avatarURL.includes('gif')) end = 'gif'
                
                try{
                    return msg.channel.send('', {file: img, name: `${fetchuser.username}_av.${end}`})
                }catch(err){
                    return msg.channel.send('This users avatar is to big')
                }
               
            }
            
        }else{
            if(!user){
                const authorembed = {
                    color: 0xFFFFFd,
                    title: "Your Avatar!",
                    image: {
                        url: msg.author.avatarURL
                    },
                    timestamp: new Date(),
                }
                msg.channel.send({ embed: authorembed })
            }else{
                const mentionembed = {
                    color: 0xFFFFFd,
                    title: "Avatar for: \n" + user.username,
                    image: {
                        url: user.avatarURL
                    }, 
                    timestamp: new Date(),
                    
                }
    
                msg.channel.send({ embed: mentionembed })
            }
        }
        

    }
}

module.exports = Avatar;
