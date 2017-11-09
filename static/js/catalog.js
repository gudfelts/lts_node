function render(data, sort) {
  var $detailBox = $(".detail-box");
  $detailBox.html("");
  var aLi = [];
  for (var i = 0; i < data.length; i++) {
    let href = '/showArticle/article?id=' +data[i].id +'&type=' +data[i].type +'&sort=' +sort;

    let title =$('<a></a>').attr('href',href).append('<h3 class="new-title">' +data[i].title +'</h3>')
    let oDiv = $('<div class="new-box"></div>');
    if (data[i].img !== "0") {

      let img = $('<img class="new-img" alt="" src='+data[i].img+'>');
      let summary = $('<a class="new-content-summary"></a>').attr('href',href).html(data[i].summary);
      let content = $('<div class="new-content"></div>').append(summary);

      oDiv.append(img,content);
    } else {
      
      let summary = $('<a class="new-content-summary"></a>').attr('href',href).html(data[i].summary);
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
    console.log(!!isSearch,typeof isSearch)
    var url = '';
      if(isSearch === '1'){

        var value = $(".search-input").attr('search-value');
  
        url =  "/OperationData/searchArticle?value=" +
        value +
        "&type=" +
        type +
        "&sort=" +
        sort +
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

      console.log()
        $.ajax({
          type: "get",
          dataType: "json",
          url:url, //提交到一般处理程序请求数据

          success: function(result) {
            //后台服务返回数据，重新加载数据
            console.log(result)
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
function search() {
  var sort = $(".M-box").attr("data-sort");
  var type = $(".M-box").attr("data-type");
  var value = $(".search-input").val();

  //标志分页为搜索
  $(".M-box").attr("search-type",'1');
  
  if (value === "") {
    alert("请输入搜索内容");
    return;
  }
  $(".search-input").attr('search-value',value);
  $.ajax({
    type: "get",
    dataType: "json",
    url:
      "/OperationData/searchArticle?value=" +
      value +
      "&type=" +
      type +
      "&sort=" +
      sort +
      "&start=" +
      0, //提交到一般处理程序请求数据

    success: function(result) {
      //后台服务返回数据，重新加载数据
      if (result.code === 200) {
        render(result.data, result.sort);
      } else {
        alert(result.msg);
      }
    }
  });
}
$().ready(function(e) {
  pagination();

  $(".search-input").keydown(function(event) {
    var e = event || window.event;
    if (e && e.keyCode == 13) {
      //回车键的键值为13
      search();
    }
  });
  $(".search-icon").click(function() {
    console.log("s");
    search();
  });
});
