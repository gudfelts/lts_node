function praise(obj,self){
    
    var id =  $(obj).attr('data-id');
    var sort =  $(obj).attr('data-sort');
    var type =  $(obj).attr('data-type');
    $.ajax({   
        type: 'get',  
        dataType: "json",
        url: 'http://lococo.site/OperationData/praise?id='+id+'&sort='+sort+'&type='+type,      //提交到一般处理程序请求数据   
        
        success: function() {
            
                    
                    var icon =$(".icon-praise");
                                    
                    icon.addClass("icon-praise-animate");
                    console.log("ssss")
                    var pariseNum = $('.praise-num');
                    var Num = pariseNum.text();
                    console.log(Num)
                    var nowNum = parseInt(Num)+1;
                    console.log(nowNum)
                    
                    pariseNum.text(nowNum);
                    $(self).unbind("click");
        }  
   }); 
}
$().ready(function(e) {

    var $oBtn = $('.icon-praise');
    
    $oBtn.click(function(){
        praise( $('.parise-box'),$oBtn);
    })
})    