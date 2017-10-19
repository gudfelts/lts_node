function praise(obj){
    
    var id =  $(obj).attr('data-id');
    var sort =  $(obj).attr('data-sort');
    $.ajax({   
        type: 'get',  
        dataType: "json",
        url: 'http://localhost:3000/OperationData/addPraise?id='+id+'&sort='+sort,      //提交到一般处理程序请求数据   
        
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
        console.log("d")
        praise(this);
    })
})    