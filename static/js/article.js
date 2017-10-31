function praise(obj){
    
    var id =  $(obj).attr('data-id');
    var sort =  $(obj).attr('data-sort');
    var type =  $(obj).attr('data-type');
    $.ajax({   
        type: 'patch',  
        dataType: "json",
        url: 'http://lococo.site/OperationData/praise?id='+id+'&sort='+sort+'&type='+type,      //提交到一般处理程序请求数据   
        
        success: function() {
            
                    
                    var icon =$(".icon-praise");
                                    
                    icon.addClass(".icon-praise-animate");
                    
                    var pariseNum = $('.praise-num');
                    var Num = pariseNum.text();
                    var nowNum = parseInt(Num)+1;
                    pariseNum.text(nowNum);
    
        }  
   }); 
}
$().ready(function(e) {

    var $oBtn = $('.parise-box');
    
    $oBtn.click(function(){
        praise(this);
    })
})    