const router = require('koa-router')();
const getIndex = require('../model/getIndex');
router.get('/',async (ctx)=>{
    let data = {};

 
    data = await getIndex();
    // console.log(data);
   
    await ctx.render('index',data);
})

module.exports = router;