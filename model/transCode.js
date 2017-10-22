const fs = require("fs");

module.exports = async data => {
  const patt1 = /<img [^>]*src=['"]([^'"]+)[^>]*>/gi;
  const patt2 = /data:image\/(jpeg|png|gif);base64,/;

  data = await data.replace(patt1, function(match, capture) {
    const path = "/images/article/" + Date.now() + ".png";
    //去掉图片base64码前面部分data:image/png;base64
    try {
      let base64 = capture.replace(patt2, "");
      fs.writeFile("static" + path, base64, "base64", function(err) {
        if (err) {
          console.log(err);
        }
      });
    } catch (e) {
      throw('图片上传失败')
      console.error("app.js error:--->", e);
    }
    return `<img src='${path}'>`;
  });

  return data;
};
