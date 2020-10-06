const fieldArray = [];
class MessageEmbed {   
    constructor() {
        return this;
    };
    setTitle(text) {
        if (!text) throw new Error('You didn\'t provide any text for the title');
        this.title = text; 
        return;
    };

    setColor(hex) {
        if (!hex) throw new Error("You didn't provide a color.");
        this.color = hex;
        return;
    };

    setURL(url) {
        if (!url) throw new Error("You didn't provide a url.");
        this.url = url;
        return;
    };

    setAuthor(text, url) {
        if (!text) throw new Error('Author can\'t be empty.');
        this.author.name = text;
        if (url) {
            this.author.icon_url = url
        }
        return;
    };
    setDescription(content) {
        if (!content) throw new Error(`No Content for description provided.`);

        this.description = content;
        return;
    };
    setThumbnail(url) {
        if (!url) throw new Error(`No Thumbnail URL Provided.`);

        this.thumbnail.url = url;
        return;
    };
    addField(title, content, position) {
        if (!title) throw new Error(`No Name specified for the field.`);

        if (!content) throw new Error(`No Value specified for the field.`);

        fieldArray.push({ name: title, value: content, inline: position ? position : false });

        this.fields = fieldArray
        return;
    };
    setImage(url) {
        if (!url) throw new Error(`No URL for embed image specified.`);
        
        this.image.url = url;
        return;
    };
    setFooter(content, url) {
        if (!content) throw new Error(`No Text for footer specified.`);
        
        this.text = content;
        
        if (url) this.icon_url = url
        return;
    };
    setTimestamp() {
        this.timestamp = new Date()
        return;
    };
};
module.exports = MessageEmbed;
