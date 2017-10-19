const router = require("koa-router")();
const getCatalog = require("../model/OperationData").getCatalog;
const api = require("config-lite")(__dirname).api.fontEnd;
const addPraise = require("../model/OperationData").addPraise;

//下一页
router.get(api.getCatalog, async ctx => {

  const sort = ctx.query.sort;
  const type = ctx.query.type;
  const start = parseInt(ctx.query.start);

  let result = await getCatalog(sort, type, start);

  ctx.response.body = result;
});
//点赞
router.get(api.addPraise, ctx => {
  const id = ctx.query.id;
  const type = ctx.query.type;

  addPraise(sort, id);
  ctx.response.body = {
    code: 200
  };
});

module.exports = router;
