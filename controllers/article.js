const router = require("koa-router")();

const downImg = require("../model/transCode");

const {saveArticle,deleteArticle,getCataloggetArticleOne,getTeam,getTeamOne,getNum,saveBanner} = require("../model/OperationData")

/* HTTP动词
    GET     //查询
    POST    //新建
    PUT     //替换
    PATCH   //更新部分属性
    DELETE  //删除指定ID的文档
*/

//存储文章
router.post('/article', async ctx => {
  let article = ctx.request.body;
  
  const type = article.selectedOptions;
  const isBanner = article.isBanner;

  delete article.selectedOptions;
  delete article.isBanner;
  article.type = type[1];
  article.praise = 0;
  article.browse = 0;
  article.time = article.time.replace(/T.*$/, "");

  try {
    var {data,path} = await downImg(article.content);
    article.content = data;
  } catch (error) {
    
    ctx.response.body = {
      code: 500,
      msg: "上传图片失败!"
    };
    return;
  };

  //储存banner
  saveBanner(type[0],article.type,article.id,path);

  await saveArticle(type[0], article);

  ctx.response.body = {
    code: 200,
    msg: "成功"
  };
  return;
});


//删除
router.delete('/article', async ctx => {
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
    ctx.response.body = {
      code: 200,
      msg: "删除成功"
    };;
  }).catch(e=>{
    throw('删除失败');
    ctx.response.body = {
      code: 500,
      msg: "删除失败"
    };
  });
});



//获取单个文章
router.get('/article', async ctx => {
  const id = ctx.query.id,
    sort = ctx.query.sort,
    type = ctx.query.type;

  const data = await getArticleOne(sort, id, type).catch(err=>{
    ctx.response.body = {
      code: 500,
      msg: "获取失败"
    };
  });

  ctx.response.body = data;
});

//修改文章
router.patch('/article', async ctx => {
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

//获取目录
router.get('/catalog', async ctx => {
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

//获取团队列表
router.get('/team',async ctx=>{
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
});

//获取专家信息  
router.get('/team/:id',async ctx=>{
  const name = ctx.query.id;

  const result = await getTeamOne(id);

  ctx.response.body = result;
    
});

//增加专家信息
router.post('/team',async ctx=>{
  let data = ctx.request.body.params;
  const {id,name,content,position,sex}= data;
  
  const result = await updateTeamOne(id,name,content,position,sex);

  ctx.response.body = result;
    
});

//修改专家信息
router.patch('/team',async ctx=>{
  let data = ctx.request.body.params;
  const {id,name,content,position,sex}= data;
  
  const result = await updateTeamOne(id,name,content,position,sex);

  ctx.response.body = result;
    
})
module.exports = router;
