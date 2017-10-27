module.exports = (ctx,next)=>{
    if(ctx.session.user){
        return next();
    }else{
        console.log('没登陆')
        ctx.body={
            code : 500,
            msg  : '未登录'
        }
    }
}