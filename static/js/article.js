function praise(obj,self){
    
    var id =  $(obj).attr('data-id');
    var sort =  $(obj).attr('data-sort');
    var type =  $(obj).attr('data-type');
    $.ajax({   
        type: 'get',  
        dataType: "json",
        url: '/OperationData/praise?id='+id+'&sort='+sort+'&type='+type,      //提交到一般处理程序请求数据   
        
        success: function() {
                               
                    var icon =$(".icon-praise");
                                    
                    icon.addClass("icon-praise-animate");
                    var pariseNum = $('.praise-num');
                    var Num = pariseNum.text();
                    var nowNum = parseInt(Num)+1;                    
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
    $('.share_weibo').click(function(){
        $('.jiathis_button_tsina').click();
    })
    $('.share_weixin').click(function(){
        $('.jiathis_button_weixin').click();
    })
    $('.share_qzone').click(function(){
        $('.jiathis_button_qzone').click();
    });
   
    var url = window.location.href;
    var summary = window.trimHtml($('.content-main').html(), { preserveTags: false, limit: 50 }).html
    $('img').error(function(){
        $(this).attr('src',"/images/error.jpg");
    })
    window.jiathis_config = { 
        url: url, 
        title: document.title, 
        summary:summary 
    }
})    