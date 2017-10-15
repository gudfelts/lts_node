const router      = require("koa-router")();
const user        = require('../controllers/user');
const article     = require('../controllers/article');
const api         = require('config-lite')(__dirname).api;

router.use(api.user.self, user.routes(), user.allowedMethods())
router.use(api.article.self, article.routes(), article.allowedMethods());

module.exports = router;