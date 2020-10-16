const Colors = require('../helpers/utils/EmbedColors');

class Embed {
    constructor(data = {}) {
        this.fields = [];
        Object.assign(this, data);

        return this;
    }

    setAuthor(name, icon, url) {
        this.author = { name, icon_url: icon, url };

        return this;
    }

    _resolveColor(color) {
        if (typeof color === 'string') {
            if (color === 'RANDOM') return Math.floor(Math.random() * (0xFFFFFF + 1));
            color = Colors[color.toUpperCase()] || parseInt(color.replace('#', ''), 16);
        }

        return color;
    }

    setColor(color) {
        this.color = this._resolveColor(color);

        return this;
    }

    setDescription(desc) {
        this.description = desc.toString().substring(0, 2048);

        return this;
    }

    addField(name, value, inline = false) {
        if (this.fields.length >= 25) {
            return this;
        } else if (!name) {
            return this;
        } else if (!value) {
            return false;
        }

        this.fields.push({ name: name.toString().substring(0, 256), value: value.toString().substring(0, 1024), inline });

        return this;
    }

    addBlankField(inline = false) {
        return this.addField('\u200B', '\u200B', inline);
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
    }
    attachFile(file) {
        this.file = file;

        return this;
    }

    setFooter(text, icon) {
        this.footer = { text: text.toString().substring(0, 2048), icon_url: icon };

        return this;
    }

    setImage(url) {
        this.image = { url };

        return this;
    }

    setTimestamp(time = new Date()) {
        this.timestamp = time;

        return this;
    }

    setTitle(title) {
        this.title = title.toString().substring(0, 256);

        return this;
    }

    setThumbnail(url) {
        this.thumbnail = { url };

        return this;
    }

    setURL(url) {
        this.url = url;

        return this;
    }
}

module.exports = Embed;