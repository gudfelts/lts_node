const router        = require("koa-router")();
const user          = require('../controllers/user');
const article       = require('../controllers/article');
const fontEnd       = require('../controllers/fontEnd');
const API_admin     = require('config-lite')(__dirname).api.admin;
const API_fontEnd   = require('config-lite')(__dirname).api.fontEnd;

//后台网站数据接口
router.use(API_admin.user.self, user.routes(), user.allowedMethods())
router.use(API_admin.article.self, article.routes(), article.allowedMethods());

//前台网站数据接口
router.use(API_fontEnd.self, fontEnd.routes(), fontEnd.allowedMethods());

module.exports = router;