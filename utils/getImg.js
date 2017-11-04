module.exports = aNew => {
 
   
    const patt1 = /<img [^>]*src=['"]([^'"]+)[^>]*>/gi;
    const patt2 = /src="[\'\"]?([^\'\"]*)[\'\"]?"/gi;
    let flag = false;
    let img =false;
    for (let i = 0; i < aNew.length; i++) {
      let content = aNew[i].content;
      if (patt1.test(content)) {
        
        //去掉引号
        img = content.match(patt2)[0].replace(/[\'\"]?/g, "");
      }else{
        img = false;
      }
    }
    
     return  img
    
  };