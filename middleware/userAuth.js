module.exports = (ctx,next)=>{
    
    if(ctx.session.isLogin){
    
        return next();
    }else{
        ctx.response.body = {
            code: 500,
            msg: "未登录!"
        };
        
    }
}