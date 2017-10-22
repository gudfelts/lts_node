const router = require("koa-router")();
const getIndex = require("../model/getIndex");
const getArticleOne = require("../model/OperationData").getArticleOne;
const getCatalog = require("../model/OperationData").getCatalog;
const getNum = require("../model/OperationData").getNum;
const getTeam = require("../model/OperationData").getTeam;
const addBrowse = require("../model/OperationData").addBrowse;
const getTeamOne = require("../model/OperationData").getTeamOne;
const getHotArticle = require("../model/OperationData").getHotArticle;

//获取文章
router.get("/showArticle/article", async ctx => {
  const id = ctx.query.id,
    sort = ctx.query.sort,
    type = ctx.query.type;

  const data = await getArticleOne(sort, id, type);

  //增加浏览数
  addBrowse(sort, id, type);
  await ctx.render("article", data);
});

//首页
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
  
  //获取近期热门文章
  let HotArticle = await getHotArticle(sort);
  let pageCount = await getNum(sort);
  
  if (pageCount % 15 > 0) {
    pageCount = parseInt(pageCount / 15) + 1;
  } else {
    pageCount = pageCount / 15;
  }
  
  result.data.pageCount = pageCount;
  result.type = parseInt(type);
  result.HotArticle = HotArticle;
  await ctx.render("catalog", result);
});

//获取专家
router.get('/showTeam/person',async ctx=>{
    const name = ctx.query.id;
  
    const result = await getTeamOne(id);
  
    await ctx.render("person", result);
})
//获取专家目录
router.get('/showTeam/catalog',async ctx=>{
  let start = parseInt(ctx.query.start) || 0;
  let result = await getTeam(start);

  if (start === 0) {
    let pageCount = await getNum('team');
    //一页20条
    if (pageCount % 20 > 0) {
      pageCount = parseInt(pageCount / 20) + 1;
    } else {
      pageCount = pageCount / 20;
    }

    result.pageCount = pageCount;
  }
  await ctx.render("team", result);
})
module.exports = router;
