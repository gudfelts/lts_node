const router  = require("koa-router")();
const saveArticle = require("../model/getData").saveArticle;
const api     = require("config-lite")(__dirname).api.article;
const downImg = require('../model/transCode');

router.post(api.postArticle, async ctx => {
 
  let article = ctx.request.body;
  const type = article.selectedOptions;
  delete article.selectedOptions;
  article.type = type[1];
  article.content = await downImg(article.content);
  article.praise = 0;
  await saveArticle(type[0],article);

  ctx.response.body = {
    code: 200,
    msg: "成功"
  };
  return;
});

module.exports = router;
