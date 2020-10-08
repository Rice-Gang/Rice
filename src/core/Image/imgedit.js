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
    static async slap(img1, img2){
        img1 = await jimp.read(img1)
        img1.resize(106, 106)
        img2 = await jimp.read(img2)
        img2.resize(182, 182)
        let base = await jimp.read(__dirname + '/imgs/slap.png')
        base.composite(img1, 412, 88)
        base.composite(img2, 145, 120)
        return base.getBufferAsync('image/png');
    }
};
module.exports = imgedit;