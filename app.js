
const koa = require("koa");
const static = require("koa-static");
const path = require("path");
const fs = require("fs");
const router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const koaLogger = require("koa-logger");
const cors = require("koa2-cors");
const views = require("koa-views");
const config = require("config-lite")(__dirname);
const apiRoute = require("./router/apiRouter");
const renderRoute = require("./router/renderRouter");
const session = require("koa-session");
const staticCache = require("koa-static-cache");
const favicon = require("koa-favicon");
const onerror = require("koa-onerror");
const catchError = require("./middleware/catchError").catchError;
const logUtil = require("./utils/log");
const routers = router();
const app = new koa();
const moment = require('moment');

const env = process.env.NODE_ENV;
onerror(app);
app.use(bodyParser({ formLimit: "200mb"}));

app.keys = ["lts_node"];
const CONFIG = {
  key: "lts_node" /** (string) cookie key (default is koa:sess) */,
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true /** (boolean) can overwrite or not (default true) */,
  httpOnly: true /** (boolean) httpOnly or not (default true) */,
  signed: true /** (boolean) signed or not (default true) */,
  rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
};
app.use(session(CONFIG, app));
app.use(favicon(__dirname + "/static/favicon.ico"));

//跨域
app.use(
  cors({
    origin: function(ctx) {
      if (ctx.url === "/test") {
        return false;
      }
      return ctx.request.header.origin;
    },
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    maxAge: 5,
    credentials: true,
    allowMethods: ["GET", "POST", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"]
  })
);

app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", ctx.request.header.origin);
  ctx.set("Access-Control-Allow-Credentials", true);
  await next();
});

//测试 配置控制台日志中间件
//正式 运行日志中间件
if(env !== "production"){
  app.use(koaLogger());

}
app.use(catchError);

//设置静态资源
//生产环境中使用nginx转发静态资源
if (env !== "production") {
  const staticPath = "/static";
  app.use(static(path.join(__dirname, staticPath)));
  app.use(
    staticCache(path.join(__dirname, staticPath), {
      maxAge: 365 * 24 * 60 * 60
    })
  );
}

// 加载模板引擎
app.use(
  views(path.join(__dirname, "./view"), {
    extension: "ejs"
  })
);

// api 路由
app.use(apiRoute.routes()).use(apiRoute.allowedMethods());

// 渲染 路由
app.use(renderRoute.routes()).use(renderRoute.allowedMethods());
app.on("error", (err, ctx) => {
  console.log(err);
  ctx.response.body = {
    code: 400,
    msg: "文件过大"
  };
  // ctx.status = 404;
});

const draftTime = moment().format('YYYY-MM-DD HH:mm:ss');
// console.log(draftTime)
app.listen(config.serverPort, () =>
  console.log(`Server is running at ${config.serverPort}`)
);

