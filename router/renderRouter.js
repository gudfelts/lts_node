const router = require('koa-router')();
const getIndex = require('../model/getIndex');
router.get('/',async (ctx)=>{
    let data = {};

 
    // const data = await getIndex();
    data.title = '首页'
    let banner = {};
    banner.id = '1';
    data.banner= banner;
    await ctx.render('index',{data});
})

module.exports = router;