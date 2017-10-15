const router = require("koa-router")();
const api = require("config-lite")(__dirname).api;
const getUser = require("../db/operateDB").getUser;
const updateUser = require("../db/operateDB").updateUser;

//登录
router.post(api.user.login, async ctx => {
  const requestData = ctx.request.body;
  if (requestData.password && requestData.account) {
    const account = [];
    account.push(requestData.account);
    let user = await getUser(account);
   
    
    if (user && user.password === requestData.password) {
      ctx.session.isLogin = true;
      ctx.session.loginUser = user;
      ctx.response.body = {
        code: 200,
        msg: "登录成功"
      };
      return;
    }
  }

  ctx.session.isLogin = false;
  ctx.response.body = {
    code: 400,
    msg: "密码错误"
  };
});

//退出账户
router.get(api.user.logout, ctx => {
  ctx.session.isLogin = flase;
  ctx.response.body = {
    code: 200,
    msg: "退出账户"
  };
});

//修改密码
router.post(api.user.changePassword, async ctx => {
  const newPass = ctx.request.body.password;
  const result = await updateUser(newPass);
  ctx.response.body = {
    code: 200,
    msg: "密码修改成功"
  };
});

module.exports = router;
