const router      = require("koa-router")();
const user       = require('../controllers/user');
const api         = require('config-lite')(__dirname).api;  

router.post(api.login, user.login);
router.get(api.logout, user.logout);

module.exports = router;