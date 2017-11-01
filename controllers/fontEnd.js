const router = require("koa-router")();

const {searchArticle, getCatalog, addPraise, getSearchNum} = require("../model/OperationData");

//下一页
router.get('/next', async ctx => {
  const sort = ctx.query.sort;
  const type = parseInt(ctx.query.type);
  const start = parseInt(ctx.query.start);

  await getCatalog(sort, type, start).then(result =>{
      ctx.response.body = result;
  
  }).catch(err => {
    ctx.response.body = {
      code : 500,
      msg : '服务器内部错误-分页查找错误!'
    }
    ctx.throw(500, "服务器内部错误-分页查找错误!");
    
  });

});
//点赞
router.get('/praise', ctx => {
  const id = ctx.query.id;
  console.log(id)
  const sort = ctx.query.sort;
  addPraise(sort, id);
  ctx.response.body = {
    code: 200
  };
});


router.get('/searchArticle',async (ctx,next) =>{
  const title = "%" +ctx.query.value + "%";
  const sort = ctx.query.sort;
  const type = ctx.query.type;
  let start = parseInt(ctx.query.start) || 0;
  

  let result = await searchArticle(sort,title, type,start).catch(()=>{
    ctx.response.body = {
      code : 500,
      msg : '搜索出现错误'
    }
    ctx.throw(500, "搜索出现错误");
    
  })

  if (start === 0) {
   
    var pageCount = await getSearchNum('article',sort,title, type);
    //一页15条

    if (pageCount % 15 > 0) {
      pageCount = parseInt(pageCount / 15) + 1;
    } else {
      pageCount = pageCount / 15;
    }
  }
 
  ctx.response.body = {
    data : result,
    pageCount : pageCount,
    sort,
    code : 200
  };
})
module.exports = router;
