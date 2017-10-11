const koa        = require("koa2");
const static     = require("koa-static");
const path       = require("path");
const fs         = require("fs");
const router     = require("koa-router");
const Router     = require("./router");
const bodyParser = require("koa-bodyparser");
const logger     = require("koa-logger");
const cors       = require("koa2-cors");
const config     = require("config-lite")(__dirname);
const routers    = router();
const app        = new koa();

app.use(bodyParser());
app.use(logger());

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
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// app.use(async (ctx, next)=> {
//   ctx.set("Access-Control-Allow-Origin", ctx.request.header.origin)
//   ctx.set("Access-Control-Allow-Credentials", true);
//   await next();
// })

//设置静态资源
const staticPath = "./static";
app.use(static(path.join(__dirname, staticPath)));

Router(routers);

app.use(routers.routes(), routers.allowedMethods());
app.listen(config.serverPort, () => console.log(`Koa2 is running at ${config.serverPort}`));