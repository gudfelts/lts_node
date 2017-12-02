const router        = require("koa-router")();
const user          = require('../controllers/user');
const article       = require('../controllers/data');
const fontEnd       = require('../controllers/fontEnd');
const userAuth   = require('../middleware/userAuth');
//后台网站数据接口
router.use('/admin/user', user.routes(), user.allowedMethods())
router.use('/admin/data', userAuth,article.routes(), article.allowedMethods());

//前台网站数据接口
router.use('/OperationData', fontEnd.routes(), fontEnd.allowedMethods());

module.exports = router;