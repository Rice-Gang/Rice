const jimp = require("jimp");
class imgedit {
  static async sepia(img) {
    img = await jimp.read(img);
    img.resize(400, 400);
    img.sepia();
    return img.getBufferAsync("image/png");
  }
  static async bars(img) {
    img = await jimp.read(img);
    img.resize(400, 400);
    let bars = await jimp.read(__dirname + "/imgs/jail_bars.png");
    img.composite(bars, 0, 0);
    return img.getBufferAsync("image/png");
  }
  static async gay(img) {
    img = await jimp.read(img);
    img.resize(400, 400);
    let gay = await jimp.read(__dirname + "/imgs/gay.png");
    img.composite(gay, 0, 0);
    return img.getBufferAsync("image/png");
  }
  static async slap(img1, img2) {
    img1 = await jimp.read(img1);
    img1.resize(106, 106);
    img2 = await jimp.read(img2);
    img2.resize(182, 182);
    let base = await jimp.read(__dirname + "/imgs/slap.png");
    base.composite(img1, 412, 88);
    base.composite(img2, 145, 120);
    return base.getBufferAsync("image/png");
  }
  static async vibeng(img) {
    img = await jimp.read(img);
    img.resize(124, 124);
    let base = await jimp.read(__dirname + "/imgs/vibing.png");
    base.composite(img, 129, 60);
    return base.getBufferAsync("image/png");
  }
  static async what(img) {
    img = await jimp.read(img);
    img.resize(110, 110);
    img.rotate(20);
    let base = await jimp.read(__dirname + "/imgs/what.png");
    base.composite(img, 210, 30);
    return base.getBufferAsync("image/png");
  }
  static async changemymind(text) {
    let base = await jimp.read(__dirname + "/imgs/changemymind.png");
    let font1 = await jimp.loadFont(jimp.FONT_SANS_64_BLACK);
    let font2 = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);
    let font3 = await jimp.loadFont(jimp.FONT_SANS_16_BLACK);
    let font4 = await jimp.loadFont(jimp.FONT_SANS_8_BLACK);
    let to_use = font1;

    let size1 = await jimp.measureText(font1, text);
    let size2 = await jimp.measureText(font2, text);
    let size3 = await jimp.measureText(font3, text);
    if (size1 > 256) to_use = font2;
    if (size2 > 256) to_use = font3;
    if (size3 > 256) to_use = font4;

    base.print(to_use, 165, 264, text);
    return base.getBufferAsync("image/png");
  }
}
module.exports = imgedit;
