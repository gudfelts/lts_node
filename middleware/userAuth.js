module.exports = (ctx,next)=>{
    if(ctx.session.user){
        return next();
    }else{
        ctx.body={
            code : 200,
            msg  : '未登录'
        }
    }
}