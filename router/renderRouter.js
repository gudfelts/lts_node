const router = require("koa-router")();
const getIndex = require("../model/getIndex");
const getArticleOne = require("../model/OperationData").getArticleOne;
const getCatalog = require("../model/OperationData").getCatalog;
const getNum = require("../model/OperationData").getNum;
const addBrowse = require("../model/OperationData").addBrowse;

router.get("/showArticle/content", async ctx => {
  const id = ctx.query.id,
    sort = ctx.query.sort,
    type = ctx.query.type;

  const data = await getArticleOne(sort, id, type);

  //增加浏览数
  addBrowse(sort, id, type);
  await ctx.render("article", data);
});
router.get("/", async ctx => {
  let data = await getIndex();
  await ctx.render("index", data);
});

//获取目录
router.get("/showArticle/catalog", async ctx => {
  const sort = ctx.query.sort;
  const type = ctx.query.type;
  let start = ctx.query.start || 0;
  let result = await getCatalog(sort, type, start);
  let pageCount = await getNum(sort);
  
  if (pageCount % 15 > 0) {
    pageCount = parseInt(pageCount / 15) + 1;
  } else {
    pageCount = pageCount / 15;
  }
  result.data.pageCount = pageCount;

  await ctx.render("catalog", result);
});

module.exports = router;
