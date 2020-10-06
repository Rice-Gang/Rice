const Guild = require('../helpers/models/Guild');

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(member) {

        Guild.findOne({
            id: member.guild.id
        }, async (err, res) => {
            if (err) console.log(err);
            if (!res) {
                const newData = new Guild({
                    id: member.guild.id
                });
                newData.save();
                return;

            } else {

                const role = await member.guild.roles.get(res.autorole);

                if (!role) {
                    res.autorole = 'none';
                    await res.save();
                }

                setTimeout(() => {
                    member.addRole(role.id).catch(() => null);
                }, 1500)
            }
        });
    }
}