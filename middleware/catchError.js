const logUtil = require("../utils/log");

const catchError = async (ctx, next) => {
  // 响应开始时间
  const start = new Date();
  // 响应间隔时间
  let ms;
  try {
    await next();
    // logUtil.logResponse(ctx, ms); // 记录响应日志
    if (ctx.status === 404) {
      ctx.throw(404);
    }
  } catch (err) {
    let message = err.message || "服务器错误";
    const status = err.status || 500;
    ms = new Date() - start;
    logUtil.logError(ctx, err, ms); // 记录异常日志
    ctx.status = status;
    if (status === 404) {
      await ctx.render("errors/404", { err: message });
    } else if (status === 500) {
      await ctx.render("errors/500", { err: message });
    }
  }
};

module.exports.catchError = catchError;
