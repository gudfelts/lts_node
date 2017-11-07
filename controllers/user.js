const router = require("koa-router")();
const {getUser, updateUser, updateUserTime} = require("../model/OperationData");

//登录
router.post('/login', async ctx => {
  
  const requestData = ctx.request.body;
  if (requestData.password && requestData.account) {
    const account = [];
    account.push(requestData.account);
    let result = await getUser(account).catch(err => {
      ctx.throw(500, "服务器内部错误-查找admin错误！");
    });
    let user = result[0];
    
    if (user && user.password === requestData.password) {
      ctx.session.user = user;
      ctx.session.isLogin = true;
      updateUserTime([requestData.loginTime,requestData.loginSite,requestData.account])
      ctx.response.body = {
        code: 200,
        loginTime : user.loginTime,
        loginSite : user.loginSite,
        msg: "登录成功",
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
router.get('/logout', ctx => {
  ctx.session.isLogin = flase;
  ctx.response.body = {
    code: 200,
    msg: "退出账户"
  };
});

//修改密码
router.post('/changePassword', async ctx => {
  const {oldPass,pass} = ctx.request.body;
  const user = ctx.session.user;
 

  if (user.password === oldPass) {
    await updateUser(pass).then(result=>{
      ctx.response.body = {
        code: 200,
        msg: "修改成功"
      };
    }).catch(()=>{
      ctx.response.body = {
        code: 500,
        msg: "修改失败"
      };
    });
  
   
    
  }else{
    ctx.response.body = {
      code: 500,
      msg: "密码错误"
    };
  }
 
});

module.exports = router;
