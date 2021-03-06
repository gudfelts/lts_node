const fs = require("fs");
const path = require("path");
const config = require('config-lite')(__dirname);
module.exports = (file)=>{
    return new Promise((resolve, reject) => {
        const tmp_path = file.path;
        
        const target_path = "/images/uploadImg/" + Date.now() + ".png";
        
        fs.rename(tmp_path, './static'+ target_path, function(err) {
          if (err) reject(err);;
          // 删除临时文件夹文件, 
          fs.unlink(tmp_path, function() {
             if (err) {
                reject(err);
            }
             else {
                 resolve( config.HOST+""+target_path)
            } 
            
          });
        });
    })
}