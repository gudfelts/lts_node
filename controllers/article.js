const router  = require("koa-router")();
const operate = require("../model/getData");
const api     = require("config-lite")(__dirname).api.article;
const downImg = require('../model/transCode');

router.post(api.postArticle, async ctx => {
 
  let article = ctx.request.body.data;
  const type = article.selectedOptions;
  delete article.selectedOptions;
  article.type = type[1];
  article.content = await downImg(article.content);
  switch (type[0]) {
    case '1':
      operate.saveInformation(article);  
      break;
    case '2':
      operate.saveResearch(article)
        break;
    case '3':
      operate.saveAchievement(article)
        break;
    case '4':
      operate.saveExchange(article)
        break;
    case '5':
      operate.saveTrain(article);
    break;
    default:

      break;
  };

  ctx.response.body = {
    code: 200,
    msg: "成功"
  };
  return;
});
module.exports = router;
