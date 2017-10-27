const fs = require("fs");

module.exports.tranforIndex = async data => {
  const patt1 = /<img [^>]*src=['"]([^'"]+)[^>]*>/gi;
  const patt2 = /data:image\/(jpeg|png|gif);base64,/;
  var IMG = false;
  data = await data.replace(patt1, function(match, capture) {
    const path = "/images/article/" + Date.now() + ".png";
    //去掉图片base64码前面部分data:image/png;base64

    let base64 = capture.replace(patt2, "");
    fs.writeFile("static" + path, base64, "base64", function(err) {
      if (err) {
        throw "图片上传失败";
      }
    });
    IMG || (IMG = path);
    return `<img src='${path}'>`;
  });

  return { data, path: IMG };
};
module.exports.tranforPerson = async data => {
  const patt2 = /data:image\/(jpeg|png|gif);base64,/;
  const path = "/images/persons/" + Date.now() + ".png";
  //去掉图片base64码前面部分data:image/png;base64

  let base64 = data.replace(patt2, "");
   fs.writeFile("static" + path, base64, "base64", function(err) {
    if (err) {
      console.log(err)
      throw "图片上传失败";
    }
  });

  return path ;
};
