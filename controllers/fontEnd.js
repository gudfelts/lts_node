const router = require("koa-router")();

const {reacherArticle, getCatalog, addPraise} = require("../model/OperationData");

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
router.get('/reacherArticle',async ctx =>{
  const title = "%" + ctx.query.title + "%";
  const sort = ctx.query.sort;

  await reacherArticle(sort,title).then(result =>{
    ctx.response.body = {
      data : result,
      code : 200
    }
  
  }).catch(()=>{
    ctx.response.body = {
      code : 500
    }
  })
})
module.exports = router;
