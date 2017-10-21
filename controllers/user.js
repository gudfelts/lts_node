const router = require("koa-router")();
// const api = require("config-lite")(__dirname).api.admin.user;
const api = require("../config/default").api.admin.user;
const getUser = require("../db/operateDB").getUser;
const updateUser = require("../db/operateDB").updateUser;

//登录
router.post(api.login, async ctx => {
  const requestData = ctx.request.body;
  if (requestData.password && requestData.account) {
    const account = [];
    account.push(requestData.account);
    let user = await getUser(account).catch(err => {
      ctx.throw(500, "服务器内部错误-查找admin错误！");
    });

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
router.get(api.logout, ctx => {
  ctx.session.isLogin = flase;
  ctx.response.body = {
    code: 200,
    msg: "退出账户"
  };
});

//修改密码
router.post(api.changePassword, async ctx => {
  const newPass = ctx.request.body.password;
  const result = await updateUser(newPass);
  ctx.response.body = {
    code: 200,
    msg: "密码修改成功"
  };
});

module.exports = router;
