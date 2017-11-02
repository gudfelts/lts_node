module.exports = aNew => {
 
   
    const patt1 = /<img [^>]*src=['"]([^'"]+)[^>]*>/gi;
    const patt2 = /src="[\'\"]?([^\'\"]*)[\'\"]?"/gi;
    let flag = false;
    for (let i = 0; i < aNew.length; i++) {
      let content = aNew[i].content;
      if (patt1.test(content)) {
        
        //去掉引号
        aNew[i].img = content.match(patt2)[0].replace(/[\'\"]?/g, "");
      }else{
        aNew[i].img = false;
      }
    }
    
     return  aNew 
    
  };