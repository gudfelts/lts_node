const router = require("koa-router")();

const {reacherArticle, getCatalog, addPraise, getReacherNum} = require("../model/OperationData");

//下一页
router.get('/next', async ctx => {
  const sort = ctx.query.sort;
  const type = ctx.query.type;
  const start = parseInt(ctx.query.start);

  let result = await getCatalog(sort, type, start).catch(err => {
    ctx.throw(500, "服务器内部错误-分页查找错误!");
  });

  ctx.response.body = result;
});
//点赞
router.patch('/praise', ctx => {
  const id = ctx.query.id;
  const sort = ctx.query.sort;
  addPraise(sort, id);
  ctx.response.body = {
    code: 200
  };
});


router.get('/reacherArticle',async (ctx,next) =>{
  const title = "%" +ctx.query.title + "%";
  const sort = ctx.query.sort;
  const type = ctx.query.type;
  let start = parseInt(ctx.query.start) || 0;
  

  let result = await reacherArticle(sort,title, type).catch(()=>{
    ctx.response.body = {
      code : 500,
      msg : '搜索出现错误'
    }
    next();
    return;
  })

  if (start === 0) {
    console.log(sort,title, type)
    var pageCount = await getReacherNum(sort,title, type);
    //一页15条

    if (pageCount % 15 > 0) {
      pageCount = parseInt(pageCount / 15) + 1;
    } else {
      pageCount = pageCount / 15;
    }
  }

  ctx.response.body = {
    data : result,
    pageCount,
    code : 200
  }
})
module.exports = router;
