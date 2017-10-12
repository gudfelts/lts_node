$().ready(function(e) {
  /*轮播图控制*/
  $(".banner").slick({
    dots: true,
    autoplay: true,
    arrows: true,
    fade: true,
    cssEase: "linear"
  });
});
