function render(data, sort) {
  var $detailBox = $(".detail-box");
  $detailBox.html("");
  var aLi = [];
  for (var i = 0; i < data.length; i++) {
    let href = '/showArticle/article?id=' +data[i].id;

    let title =$('<a></a>').attr('href',href).append('<h3 class="new-title">' +data[i].title +'</h3>')
    let oDiv = $('<div class="new-box"></div>');
    if (data[i].img !== "0") {
      let strImg = ''
      let img = $('<img class="new-img" alt="" src='+data[i].img+'> ' ).error(function(){
        $(this).attr('src',"/images/error.jpg");
      }).css('height',"220px");
      
      
      let content = $('<a class="new-content-summary target="_blank"></a>').attr('href',href);
      let summary = $('<div class="new-content"></div>').html(data[i].summary);
      content.append([img,summary]);
      oDiv.append(content);
    } else {
      
      let summary = $('<a></a>').attr('href',href).html(data[i].summary);
      let content = $('<div class="new-content-other"></div>').append(summary);
      oDiv.append(content);
      
    }
    oDiv.append(
      "<div class='new-content-data'><span class='data-time'>" +
      data[i].time +
      "</span><span class='data-browse'>" +
      data[i].browse +
      "</span><span class='data-praise'>" +
      data[i].praise +
      "</span></div>");
    var oLi = $("<li></li>").append(title,oDiv);
    aLi.push(oLi);
  }
  $detailBox.append(aLi);
}
function pagination() {
  var pageCount = $(".M-box").attr("data-page");
  var sort = $(".M-box").attr("data-sort");
  var type = $(".M-box").attr("data-type");

  $(".M-box").pagination({
    coping: true,
    homePage: "首页",
    endPage: "末页",
    prevContent: "上页",
    nextContent: "下页",
    pageCount: pageCount,
    jump: true,
    callback: function(api) {
    var isSearch = $(".M-box").attr("search-type");
    var start = (api.getCurrent() - 1) * 9 + api.getCurrent() - 1;
   
    var url = '';
      if(isSearch === '1'){

        var key = $(".M-box").attr('data-key');

        url =  "/OperationData/searchArticle?key=" +
        key +
        "&start=" +
        start
      }else{
        url =  "/OperationData/next?start=" +
        start +
        "&type=" +
        type +
        "&sort=" +
        sort
      }

        $.ajax({
          type: "get",
          dataType: "json",
          url:url, //提交到一般处理程序请求数据

          success: function(result) {
            //后台服务返回数据，重新加载数据
            if (result.code === 200) {
              render(result.data, result.sort);
              $('html,body').animate({ scrollTop: 0 }, 700);  
            } else {
              alert(result.msg);
            }
          }
        });
    }
  });
}

$().ready(function(e) {
  pagination();

  $(".search-input").keydown(function(event) {
    var e = event || window.event;
    if (e && e.keyCode == 13) {
      //回车键的键值为13
      $("#search").submit()
    }
  });
  $(".search-icon").click(function() {
    $("#search").submit()
  });
  $('img').error(function(){
    $(this).attr('src',"/images/error.jpg");
  })
});
