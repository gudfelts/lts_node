const router = require("koa-router")();

const {
  searchArticle,
  getCatalog,
  addPraise,
  getSearchNum,
  saveFeedBack
} = require("../model/OperationData");

//下一页
router.get("/next", async ctx => {
  const sort = ctx.query.sort;
  const type = parseInt(ctx.query.type);
  const start = parseInt(ctx.query.start);

  await getCatalog(sort, type, start)
    .then(result => {
      result.code = 200;
      ctx.response.body = result;
    })
    .catch(err => {
      ctx.response.body = {
        code: 500,
        msg: "服务器内部错误-分页查找错误!"
      };
      ctx.throw({errno:500,cdoe : "服务器内部错误-分页查找错误!"});
      ctx.status = 500
    });
});
//点赞
router.get("/praise", ctx => {
  const id = ctx.query.id;
  const sort = ctx.query.sort;
  addPraise(sort, id);
  ctx.response.body = {
    code: 200
  };
});
//意见反馈
router.post("/feedBack", ctx => {
  const title = ctx.request.body.title;
  const content = ctx.request.body.content;
  let date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();

  hours < 10 &&
    (hours = "0" + hours)(minutes < 10) &&
    (minutes = "0" + minutes)(seconds < 10) &&
    (seconds = "0" + seconds);

  const time =
    year +
    "年" +
    month +
    "月" +
    day +
    "日 " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
-
  saveFeedBack({ title, content, isread: 0, time });
  ctx.redirect("/");
});

router.get("/searchArticle", async (ctx, next) => {
  const title = "%" + ctx.query.value + "%";
  const sort = ctx.query.sort;
  const type = ctx.query.type;
  let start = parseInt(ctx.query.start) || 0;

  let result = await searchArticle(sort, title, type, start).catch(() => {
    ctx.response.body = {
      code: 500,
      msg: "搜索出现错误"
    };
    ctx.throw(500, "搜索出现错误");
  });

  if (start === 0) {
    var pageCount = await getSearchNum("article", sort, title, type);
    //一页15条

    if (pageCount % 15 > 0) {
      pageCount = parseInt(pageCount / 15) + 1;
    } else {
      pageCount = pageCount / 15;
    }
  }

  ctx.response.body = {
    data: result,
    pageCount: pageCount,
    sort,
    code: 200
  };
});
module.exports = router;
