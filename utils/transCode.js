const fs = require("fs");

module.exports.tranforBase64 = async data => {


  const patt1 = /<img [^>]*src=['"]([^'"]+)[^>]*>/gi;
  const patt2 = /data:image\/(jpeg|png|gif);base64,/;
  const patt3 = /<img [^>]*src=['"]([^'"]+)[^>]*>/;
  let IMG = false;
  if(patt2.test(data)){
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
      return `<img src="${path}">`;
    });
  }else if(patt3.test(data)){
    IMG = data.match(patt3)[1];
    
  }

  return { data, path: IMG };
};
