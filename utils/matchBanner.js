module.exports = (data,target)=>{
    const patt1 = /<img [^>]*src=['"]([^'"]+)[^>]*>/gi;
    const patt2 =  new RegExp(target);;

    const aIMG = data.match(patt1);
    let len = aIMG.length;
    let indexbanner = 0;
    
    aIMG.forEach((element,index) => {
        
        patt2.test(element) && (indexbanner= index)
    });
  
    return indexbanner;

}