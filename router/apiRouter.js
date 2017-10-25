const router        = require("koa-router")();
const user          = require('../controllers/user');
const article       = require('../controllers/article');
const fontEnd       = require('../controllers/fontEnd');
const API_fontEnd   = require('config-lite')(__dirname).api.fontEnd;
const userAuth   = require('../middleware/userAuth');

//后台网站数据接口
router.use('/admin',userAuth);
router.use('/admin/user', user.routes(), user.allowedMethods())
router.use('/admin/data', article.routes(), article.allowedMethods());

//前台网站数据接口
router.use(API_fontEnd.self, fontEnd.routes(), fontEnd.allowedMethods());

module.exports = router;