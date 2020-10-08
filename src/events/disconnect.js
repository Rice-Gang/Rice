const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
module.exports = class {
    constructor(rice) {
        this.rice = rice;
    }

    async run(rice) {

        while (this.rice.shards.get(0).status == 'disconnected'){
            await sleep(10000)
            await this.rice.connect();
        } 

    }
}
