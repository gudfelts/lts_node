
module.exports =  ctx => {
    const user = ctx.request.body;

    if (user.password !== "admin" || user.account !== "admin") {
      ctx.response.body = {
        code: 404,
        msg : '密码或账户错误'
      };
    } else {
      ctx.response.body = {
        code: 200,
        msg : '登录成功'
      };
    }
  };