$().ready(function(e) {
 
    var pageCount = $('.M-box').attr('data-page');
    var sort = $('.M-box').attr('data-sort');
    var type = $('.M-box').attr('data-type');
    console.log(pageCount)
    $('.M-box').pagination({
        coping:true,
        homePage:'首页',
        endPage:'末页',
        prevContent:'上页',
        nextContent:'下页',
        pageCount : pageCount,
        jump: true,
        callback:function(api){
           
            start = (api.getCurrent() - 1)*14 + api.getCurrent() - 1,
                
            $.ajax({   
                type: 'get',  
                dataType: "json",
                url: 'http://localhost:3000/showArticle/catalog_ajax?start='+start+'&type='+type+'&sort='+sort,      //提交到一般处理程序请求数据   
                
                success: function(data) {
                    //后台服务返回数据，重新加载数据
                           
                }  
           }); 
        }
       
    });
  });