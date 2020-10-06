const jimp = require('jimp')
class imgedit{
    static async sepia(img){
        img = await jimp.read(img);
        img.resize(400, 400);
        img.sepia();
        return img.getBufferAsync('image/png');
    }
};
module.exports = imgedit;