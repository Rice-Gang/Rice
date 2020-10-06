const jimp = require('jimp')
class imgedit{
    static async sepia(img){
        img = await jimp.read(img);
        img.resize(400, 400);
        img.sepia();
        return img.getBufferAsync('image/png');
    }
    static async bars(img){
        img = await jimp.read(img);
        img.resize(400, 400);
        let bars = await jimp.read(__dirname + '/imgs/jail_bars.png')
        img.composite(bars, 0, 0)
        return img.getBufferAsync('image/png');
    }
    static async gay(img){
        img = await jimp.read(img);
        img.resize(400, 400);
        let gay = await jimp.read(__dirname + '/imgs/gay.png')
        img.composite(gay, 0, 0)
        return img.getBufferAsync('image/png');
    }
};
module.exports = imgedit;