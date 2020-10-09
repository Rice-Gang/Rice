class find {
  static async find(msg, args, rice) {
    let lastimg = false;
    let user =
      msg.mentions[0] ||
      msg.channel.guild.members.find(
        (x) => x.username.toLowerCase() == args.join(" ").toLowerCase()
      ) ||
      rice.users.find((x) => x.id == args[0]);
    if (user) {
      //https://cdn.discordapp.com/avatars/373293135704621077/f6063ffac94b1760c95b6c7062e83d85.jpg?size=128
      let hash = user.avatar;
      let id = user.id;
      lastimg = `https://cdn.discordapp.com/avatars/${id}/${hash}.png`;
    }
    if (!user) {
      await msg.channel.getMessages().then((message) => {
        message.forEach((data) => {
          if (!data.attachments[0]) return;
          if (!data.attachments[0].url.includes("png")) {
            if (!data.attachments[0].url.includes("jpeg")) {
              if (!data.attachments[0].url.includes("jpg")) {
                return;
              }
            }
          }
          if (!lastimg == false) return;
          lastimg = data.attachments[0].url;
        });
      });
    }

    return lastimg;
  }
}
module.exports = find;
