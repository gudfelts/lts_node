const router = require("koa-router")();
const getIndex = require("../model/getIndex");
const getArticleOne = require("../model/getData").getArticleOne;
const getArticle = require("../model/getData").getArticle;
const getNum = require("../model/getData").getNum;

router.get("/showArticle/content", async ctx => {
  const id = ctx.query.id,
    sort = ctx.query.sort,
    type = ctx.query.type;

  const data = await getArticleOne(sort, [id, type]);

  await ctx.render("article", data);
});
router.get("/", async ctx => {
  let data = await getIndex();
  await ctx.render("index", data);
});
router.get("/showArticle/catalog", async ctx => {
  const sort = ctx.query.sort;
  const type = ctx.query.type;
  let start = ctx.query.start || 0;
  let end = parseInt(start) + 14;
  let result = await getArticle(sort, type, start, end);
  let pageCount = await getNum(sort);
  console.log(end)
  //一页15条
  if (pageCount % 15 > 0) {
    pageCount = parseInt(pageCount / 15) + 1;
  } else {
    pageCount = pageCount / 15;
  }

  result.data.pageCount = pageCount;

  await ctx.render("catalog", result);
});
router.get("/showArticle/catalog_ajax", async ctx => {
  const sort = ctx.query.sort;
  const type = ctx.query.type;
  const start = parseInt(ctx.query.start);
  let end = start + 14;

  // let pageCount = await getNum(sort);
  // end = end > pageCount ? pageCount  : end;
  let result = await getArticle(sort, type, start, end);

  ctx.response.body = result;
});
module.exports = router;
