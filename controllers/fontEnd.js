const router = require("koa-router")();
const getCatalog = require("../model/OperationData").getCatalog;
const addPraise = require("../model/OperationData").addPraise;

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

module.exports = router;
