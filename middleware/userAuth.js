module.exports = (ctx,next)=>{
    if(ctx.session.isLogin){
        console.log("登录")
        
        return next();
    }else{
        console.log("未登录")
        ctx.response.body = {
            code: 500,
            msg: "未登录!"
        };
        
    }
}