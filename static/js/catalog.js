function render(data,sort){
    
    var $detailBox = $('.detail-box');
    $detailBox.html('');
    var aLi = [];
    for(var i = 0;i < data.length;i++){
        var olink = $('<a></a>');
        var href = '/showArticle/article?id='+data[i].id+'&type='+data[i].type+'&sort='+sort;
        olink.attr('href',href).text(data[i].title);
        var oLi = $('<li></li>').html(olink);
        aLi.push(oLi);
        
    }
    $detailBox.append(aLi);
    
}
function pagination(){
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
           
            start = (api.getCurrent() - 1)*9 + api.getCurrent() - 1,
                
            $.ajax({   
                type: 'get',  
                dataType: "json",
                url: '/OperationData/next?start='+start+'&type='+type+'&sort='+sort,      //提交到一般处理程序请求数据   
                
                success: function(result) {
                    //后台服务返回数据，重新加载数据
                    render(result.data,result.sort)
                }  
           }); 
        }
       
    });
}
function search(){

    $("#search-input").keydown ( function (event) {
        var e = event || window.event;
        if (e && e.keyCode == 13) { //回车键的键值为13
            var value = $('#search-input').val();
            if(value === '') {
                alert('请输入搜索内容')
                return;
            }
    
            $.ajax({   
                type: 'get',  
                dataType: "json",
                url: '/OperationData/searchArticle?value='+value+'&type='+type+'&sort='+sort+'&start='+0,      //提交到一般处理程序请求数据   
                
                success: function(result) {
                  
                    //后台服务返回数据，重新加载数据
                    if(result.code === 200){
                        render(result.data,result.sort)
                    
                    }else{
                        alert(result.msg);
                    }
                }  
           }); 
        }
    });
    
    var sort = $('.M-box').attr('data-sort');
    var type = $('.M-box').attr('data-type');
   
    
}
$().ready(function(e) {
    pagination();
    search();

    

});