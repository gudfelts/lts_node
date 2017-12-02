module.exports = (ctx,next)=>{
    
    if(ctx.session.isLogin){
    console.log(ctx.session.user)
    
        return next();
    }else{
        console.log("未登录")
        ctx.response.body = {
            code: 500,
            msg: "未登录!"
        };
        
    }
}