const router = require("koa-router")();
const getIndex = require("../model/getIndex");
const TYPE = require('config-lite')(__dirname).type;
const HOST = require('config-lite')(__dirname).HOST;

const {
  getHotArticle,
  getArticleNum,
  getTeamoOther,
  addBrowse,
  getTeam,
  getPerson,
  getNum,
  getArticleOne,
  getCatalog,
  getLinkCatalog,
  getIntro,
  searchArticle,
  getSearchNum,
  getResearchdir
} = require("../model/OperationData");
//获取文章
router.get("/showArticle/article", async ctx => {
  const id = ctx.query.id;

  const data = await getArticleOne(id),
  sort = data[0].sort,
  type = data[0].type;
  
  const HotArticle = await getHotArticle(sort);
  //增加浏览数
  addBrowse(id);
  let route = [{name:'流通所首页',path:HOST},{name:TYPE[sort].self,path:`${HOST}/showArticle/catalog?sort=${sort}&type=${type}`}];
  
  await ctx.render("article", { data: data[0], HotArticle, sort, route });
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
  let pageCount = await getArticleNum([sort, type]);

  if (pageCount % 10 > 0) {
    pageCount = parseInt(pageCount / 10) + 1;
  } else {
    pageCount = pageCount / 10;
  }

  result.pageCount = pageCount;

  result.type = parseInt(type);
  result.HotArticle = HotArticle;
  await ctx.render("catalog", result);
});
//搜索
router.get("/showArticle/search", async (ctx, next) => {
  const key = "%" + ctx.query.key + "%";
  let start = parseInt(ctx.query.start) || 0;
  let data = await searchArticle([ key,start]).catch((e) => {
    
    ctx.throw(500, e);
  });

  if (start === 0) {
    var pageCount = await getSearchNum("article", key, null, null);
    //一页15条

    if (pageCount % 15 > 0) {
      pageCount = parseInt(pageCount / 15) + 1;
    } else {
      pageCount = pageCount / 15;
    }
  }
  console.log(data)
  await ctx.render('search',{
    key : ctx.query.key,
    pageCount,
    code :200,
    data,  
    title : key,
  })
 
});

//获取研究方向目录
router.get("/introduction/acgency", async ctx => {

  await ctx.render("./introduction/acgency");
});
//获取本院简介
router.get("/introduction/index", async ctx => {
  const data = await getIntro();
  await ctx.render("./introduction/index", { data : data[0].content });
});
router.get("/feedback", async ctx => {
  await ctx.render("feedback");
});
//友情链接
router.get("/links", async ctx => {
  const links = await getLinkCatalog();
  await ctx.render("Links", { links });
});
//获取研究方向
router.get("/introduction/researchdir", async ctx => {
  const data = await getResearchdir();
  await ctx.render("./introduction/researchdir",{data:data[0].content});
});
//获取研究团队目录
router.get("/introduction/team/catalog", async ctx => {
  let start = parseInt(ctx.query.start) || 0;
  let result = {};
  let sort = 'team'
  result.person = await getTeam([sort,start]);
  if (start === 0) {
    let pageCount = await getNum(sort);
    //一页20条
    if (pageCount % 20 > 0) {
      pageCount = parseInt(pageCount / 20) + 1;
    } else {
      pageCount = pageCount / 20;
    }
    result.pageCount = pageCount;
  }
  await ctx.render("./introduction/team", result);
});
//获取专家介绍目录
router.get("/showArticle/expert/catalog", async ctx => {
  let start = parseInt(ctx.query.start) || 0;
  let result = {};
  let sort = 'expert';
  result.person = await getTeam([sort,start]);
  if (start === 0) {
    let pageCount = await getNum(sort);
    //一页20条
    if (pageCount % 20 > 0) {
      pageCount = parseInt(pageCount / 20) + 1;
    } else {
      pageCount = pageCount / 20;
    }
    result.pageCount = pageCount;
  }
  await ctx.render("./expert", result);
});
//获取专家
router.get("/introduction/team/person", async ctx => {
  const id = ctx.query.id;
  const sort = ctx.query.sort;

  const person = await getPerson([sort,id]);
  const other = await getTeamoOther([sort,id]);
  await ctx.render("./introduction/person", { person: person[0], other ,sort});
});
module.exports = router;
