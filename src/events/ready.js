module.exports = class {
    constructor(rice) {
        this.rice = rice;
    }

    async run(rice) {

        console.log(`Logged in as ${this.rice.user.username}#${this.rice.user.discriminator}`)

        this.rice.editStatus({
            type: 2,
            name: 'rice help',
            status: 'online'
        });
    }
}