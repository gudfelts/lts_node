
const catchError = async (ctx, next) => {
  try {
    await next();
    if (ctx.status === 404) {
      ctx.throw(404);
    }
  } catch (err) {
    let message = err.message || "服务器错误";
    const status = err.status || 500;
    console.log(err)
    ctx.status = status;
    if (status === 404) {
      await ctx.render("errors/404", { err: message });
    } else if (status === 500) {
      await ctx.render("errors/500", { err: message });
    }
  }
};

module.exports.catchError = catchError;
