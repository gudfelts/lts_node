function showDiv(obj) {
  obj.show(0).css("display", "block");
}

function hideDiv(obj) {
  obj.hide(0).css("display", "none");
}
function computedDisplay(toTopBtn) {
  //滚动的高度
  var curTop = document.documentElement.scrollTop || document.body.scrollTop;
  //一屏幕高度
  var curHeight =
    document.documentElement.clientHeight - 200 || document.body.clientHeight;

  // toTopBtn.style.display = curTop > curHeight ? "block" : "none";
  toTopBtn.style.opacity = curTop > curHeight ? "1" : "0";

  window.onscroll = computedDisplay; //不论鼠标拖动还是方向键还是JS控制都会有反馈

  toTopBtn.onclick = function() {
    //当点击的时候，让go消失,由于向上滚时，又触发了onscroll事件，为block，需要先屏蔽该监听，否则会同时触发onscroll
    // this.style.display = "none";
    toTopBtn.style.opacity = "0";
    window.onscroll = null; //取消绑定一下下
    //回到顶部，总时间duration500ms，频率interval一次走10ms
    //总距离target：当前位置-目标位置  步长step：每一次走的距离
    var duration = 500,
      interval = 10,
      target = document.documentElement.scrollTop || document.body.scrollTop,
      step = target / duration * interval; // (target / duration)为总距离/总时间=总速度，而每次走的距离为10，相乘得到每次走的距离

    var timer = window.setInterval(function() {
      var curTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (curTop === 0) {
        window.clearTimeout(timer);
        window.onscroll = computedDisplay; //动画结束后重新绑定
        return;
      }
      curTop -= step;
      document.documentElement.scrollTop = curTop;
      document.body.scrollTop = curTop;
    }, interval);
  };
}
function toTop() {
  var toTopBtn = document.getElementById("goTop");
  if (toTopBtn !== null) computedDisplay(toTopBtn);
  //当浏览器卷去的高度超过一屏幕才显示回到顶部，否则隐藏
}
$().ready(function(e) {
  $(".nav_item").mouseenter(function() {
    $(".item_content").hide(0);
    showDiv($(this).children(".item_content"));
  });
  $(".nav_item").mouseleave(function() {
    hideDiv($(this).children(".item_content"), true);
  });

  toTop();
});
