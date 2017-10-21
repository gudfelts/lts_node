const router = require("koa-router")();
const saveArticle = require("../model/OperationData").saveArticle;
const deleteArticle = require("../model/OperationData").deleteArticle;
const api = require("config-lite")(__dirname).api.admin.article;
const downImg = require("../model/transCode");
const getCatalog = require("../model/OperationData").getCatalog;
const getTeam = require("../model/OperationData").getTeam;
const getTeamOne = require("../model/OperationData").getTeamOne;
const getNum = require("../model/OperationData").getNum;

router.post(api.postArticle, async ctx => {
  let article = ctx.request.body;
  const type = article.selectedOptions;
  delete article.selectedOptions;
  article.type = type[1];
  article.time = article.time.replace(/T.*$/, "");
  article.content = await downImg(article.content);
  article.praise = 0;
  article.browse = 0;
  await saveArticle(type[0], article);

  ctx.response.body = {
    code: 200,
    msg: "成功"
  };
  return;
});
router.get(api.deleteArticle, async ctx => {
  const id = ctx.query.id,
    sort = ctx.query.sort,
    type = ctx.query.type;

  await deleteArticle(sort, id, type);
});

//批量删除
router.post(api.batchDeleteArticle, async ctx => {
  let data = ctx.request.body.params;
  let sort = ctx.request.body.sort;
  let queue = [];

  for (let i = 0, len = data.length; i < len; i++) {
    const id = data[i].id,
      type = data[i].type;

    const q = deleteArticle(sort, id, type);
    queue.push(q);
  }
  Promise.all(queue).then(result => {
    ctx.response.body = result;
  });
});

//获取目录
router.get(api.getCatalog, async ctx => {
  const sort = ctx.query.sort;
  const type = ctx.query.type;
  let start = parseInt(ctx.query.start) || 0;
  let result = await getCatalog(sort, type, start);

  if (start === 0) {
    let pageCount = await getNum(sort);
    //一页15条
    if (pageCount % 15 > 0) {
      pageCount = parseInt(pageCount / 15) + 1;
    } else {
      pageCount = pageCount / 15;
    }

    result.pageCount = pageCount;
  }
  ctx.response.body = result;
});

router.get(api.getArticle, async ctx => {
  const id = ctx.query.id,
    sort = ctx.query.sort,
    type = ctx.query.type;

  const data = await getArticleOne(sort, id, type);

  ctx.response.body = data;
});
//修改文章
router.post(api.editArticle, async ctx => {
  let data = ctx.request.body.params;

  const id = data.id,
    sort = data.sort,
    type = data.type;
    content = data.content;
    time = data.time;
    source = data.source;
    author = data.author;

  const result = await getArticleOne(sort, id, type, content, time, source, author);

  ctx.response.body = result;
});
//获取团队列表
router.get('/Team',async ctx=>{
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
  ctx.response.body = result;
})
//获取专家信息  
router.get('/TeamOne',async ctx=>{
  const name = ctx.query.id;

  const result = await getTeamOne(id);

  ctx.response.body = result;
    
})
//修改专家信息
router.post('/TeamOne',async ctx=>{
  let data = ctx.request.body.params;
  const {id,name,content,position,sex}= data;
  
  const result = await updateTeamOne(id,name,content,position,sex);

  ctx.response.body = result;
    
})
module.exports = router;
