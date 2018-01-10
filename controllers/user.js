
const router = require("koa-router")();
const nodemailer = require('nodemailer');
const TRANSPORTER = require("config-lite")(__dirname).transporter;
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const {getUser, changePassword, updateUserTime} = require("../model/OperationData");


//登录
router.post('/login', async ctx => {
  
  
  const requestData = ctx.request.body;
  if (requestData.password && requestData.account) {
    let account = requestData.account;
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
  
    }
  }else{
    ctx.session.isLogin = false;
    ctx.response.body = {
      code: 400,
      msg: "密码错误"
    };
  }

  
});

//退出账户
router.get('/logout', ctx => {
  ctx.session.isLogin = false;
  ctx.session.user = null;

  ctx.response.body = {
    code: 200,
    msg: "退出账户"
  };
});

//修改密码
router.post('/changePassword', async ctx => {
  const {oldPass,pass} = ctx.request.body;
  const user = ctx.session.user;
 
  if(ctx.session.user === null && !ctx.session.isLogin){
    ctx.response.body = {
      code: 500,
      msg: "未登录"
    };
  }else{
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
  }
 
 
});

router.get('/resetPassword',async ctx =>{
  
  const email = ctx.query.email;
  const template = ejs.compile(fs.readFileSync(path.resolve(process.cwd(), './view/email/email.ejs'), 'utf8'));
  let VerCode  = parseInt(Math.random()*10000);
  const time  = moment().format('YYYY-MM-DD HH:mm:ss');
  
  const html = template({
    VerCode,
    time
  });
  let mailOptions = {
    from: '"广财流通所后台账户密码重置" gdufelts@163.com', 
    to: email,
    subject: 'Hello',  
    html: html,
  };
  ctx.response.body = {
    code: 200,
    msg: "已经将验证码发到邮箱，请注意查看！"
  };
  let transporter = nodemailer.createTransport(TRANSPORTER);

  try{
    transporter.sendMail(mailOptions)
    ctx.session.vercode = VerCode;
      ctx.response.body = {
        code: 200,
        msg: "已经将验证码发到邮箱，请注意查看！"
      };
  }catch(e){
    ctx.throw(500, "服务器错误");
    
  }

 

})
router.post('/resetPassword',async ctx =>{
  const {pass,VerCode,loginTime,loginSite} = ctx.request.body;
  
  if(parseInt(VerCode) == ctx.session.vercode){
    await changePassword(pass).then(async ()=>{

      let result = await getUser('admin');
      let user = result[0];


      updateUserTime([loginTime,loginSite,'admin'])
      ctx.response.body = {
        code: 200,
        loginTime : user.loginTime,
        loginSite : user.loginSite,
        msg: "修改成功",
      };

    }).catch((e)=>{
      console.log(e)
      ctx.response.body = {
        code: 500,
        msg: "修改失败"
      };
    });  
  }else{
    ctx.response.body = {
      code: 500,
      msg: "验证码错误"
    };
  }
  
})
module.exports = router;
