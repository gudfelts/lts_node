const fs = require("fs");

module.exports = async (data,indexBanner = 0) => {


  const patt1 = /<img [^>]*src=['"]([^'"]+)[^>]*>/gi;
  const patt2 = /data:image\/(jpeg|png|gif);base64,/;
  const patt3 = /<img [^>]*src=['"]([^'"]+)[^>]*>/;
  let IMG = false;
  let i = 0;
  let path = null;

  //图片为BASE64格式，转换下载
  if(patt2.test(data)){

  
    data = await data.replace(patt1, function(match, capture) {
      
      path = "/images/article/" + (parseInt(Date.now()) +Math.ceil(Math.random()*10)) +".png";
      //去掉图片base64码前面部分data:image/png;base64
      console.log(i++);
      let base64 = capture.replace(patt2, "");
      fs.writeFile("static" + path, base64, "base64", function(err) {
        if (err) {
          throw "图片上传失败";
        }
      });
       
      if(indexBanner == 0) {
        IMG = path
      }
      indexBanner--;
      
      console.log(path)
      return `<img src=${path}>`;
    });
  }else if(patt3.test(data)){
      IMG = data.match(patt1);
      IMG = IMG[indexBanner].match(patt3)[1];
  }
  return { data, path: IMG };
};