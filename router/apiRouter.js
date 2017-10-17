const router      = require("koa-router")();
const user        = require('../controllers/user');
const article     = require('../controllers/article');
const api         = require('config-lite')(__dirname).api;
const getCatalog  = require("../model/getData").getCatalog;
const praise  = require("../model/getData").praise;

router.use(api.user.self, user.routes(), user.allowedMethods())
router.use(api.article.self, article.routes(), article.allowedMethods());

//获取下一页
router.get("/showArticle/catalog_ajax", async ctx => {
    const sort = ctx.query.sort;
    const type = ctx.query.type;
    const start = parseInt(ctx.query.start);
  
    let result = await getCatalog(sort, type, start);
    
    ctx.response.body = result;
  });
//点赞
router.get("/showArticle/praise", ctx=>{
    const id = ctx.query.id;
    const type = ctx.query.type;

    praise(sort,id)

})
module.exports = router;