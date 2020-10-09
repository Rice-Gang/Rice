class Embed {
    constructor(embed = {}) {
        this.setup(embed);
    }
    setup(embed) {
        this.fields = [];
        Object.assign(this, embed);
        return this;
    }
    setTitle(title) {
        if (title == undefined) throw new Error(`Title cannot be empty`);


        this.title = title;
        return this;
    }
    setDescription(desc) {
        if (desc == undefined) throw new Error(`Description cannot be empty`);

        this.description = desc;
        return this;
    }
    setImage(url) {
        if (url == undefined) throw new Error(`Image URL cannot be empty`);

        this.image = { url };
        return this;
    }
    setThumbnail(url) {
        if (url == undefined) throw new Error(`Thumbnail URL cannot be empty`);

        this.thumbnail = { url };
        return this;
    }
    setFooter(text, icon_url) {
        if (text == undefined) throw new Error(`Footer cannot be empty`);

        text = text.toString();

        this.footer = { text, icon_url };
        return this;
    }
    setAuthor(name, icon_url) {
        if (name == undefined) throw new Error(`Author cannot be empty`);

        this.author = { name, icon_url };
        return this;
    }
    setTimestamp(timestamp) {
        if (!isNaN(timestamp)) {
            this.timestamp = new Date(timestamp).toISOString()
        } else {
            this.timestamp = new Date()
        }
        return this;
    }
    setColor(color) {
        if (color && color.toString().includes("#")) {
            color = color.toString().split("#").join(" ")
            this.color = parseInt("0x" + color.trim());
        } else if (color.toString().toLowerCase() == "random") {
            this.color = (Math.random() * (1 << 24)) | 0
        } else this.color = parseInt(color);
        return this;
    }
    addField(name, value, inline) {
        if (this.fields.length >= 25) throw new Error(`25 max fields limit exceeded`);
        if (!name) throw new Error(`No Name for the field specified`);
        if (!value) throw new Error(`No Value for the field specified`);
        this.fields.push({ name: name.toString().substring(0, 256), value: value.toString().substring(0, 1024), inline: inline?inline: false})
        
        return this;
    }
    addFields(array) {
        if (!array || !Array.isArray(array)) {
            throw new Error(`Not a valid fields array`);
        }
        if (this.fields.length + array.length > 25) array = array.slice(0, (25-this.fields.length + array.length));
        
        array.forEach(e => {
            if (e.name == undefined || e.name == null) {
                throw new Error(`No valid name for the field specified`)
            }
            if (e.value == undefined || e.value == null) {
                throw new Error(`No Valid value for the field specified`)
            }
            this.fields.push({ name: e.name, value: e.value, inline: e.inline || false });
        })
        return this;
    }
    setURL(url) {
        this.url = url;
        return this;
    }
}
module.exports = Embed;