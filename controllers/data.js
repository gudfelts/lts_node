const router = require("koa-router")();
const transCode = require("../utils/transCode");
const downImg = require("../utils/downImg");
const asyncBusboy = require('async-busboy');


const {
  saveArticle,
  deleteArticle,
  getArticleOne,
  editArticle,  
  getTeam,
  getPerson,
  saveTeam,
  updatePerson,
  deletePerson,
  getCatalog,
  getNum,
  saveBanner,
  reacherArticle
  
} = require("../model/OperationData");



/* HTTP动词
    GET     //查询
    POST    //新建
    PUT     //替换
    PATCH   //更新部分属性
    DELETE  //删除指定ID的文档
*/

//存储文章
router.post("/article", async (ctx,next) => {
  let article = ctx.request.body;

  const type = article.selectedOptions;
  const isBanner = article.isBanner;

  delete article.selectedOptions;
  delete article.isBanner;
  article.type = type[1];
  article.praise = 0;
  article.browse = 0;
  article.time = article.time.replace(/T.*$/, "");
  try {
    var { data, path } = await transCode.tranforIndex(article.content);
    article.content = data;
  } catch (error) {
    ctx.response.body = {
      code: 500,
      msg: "上传图片失败!"
    };
    return;
  }
  const id = await saveArticle(type[0], article).catch(()=>{
    ctx.response.body = {
      code: 500,
      msg: "上传文章失败"
    };
    next();
  });

  //储存banner

  isBanner && saveBanner(type[0], article.type, id, path);

  ctx.response.body = {
    code: 200,
    msg: "成功"
  };
  return;
});

//删除
router.post("/deletearticle", async ctx => {
  let data = ctx.request.body.article;
  let sort = ctx.request.body.sort;
  let flag = true;


  for (let i = 0, len = data.length; i < len && flag; i++) {
    const id = data[i].id,
      type = data[i].type;
    await deleteArticle(sort, id, type).catch(e => {
      console.log("error");
      ctx.response.body = {
        code: 500,
        msg: "删除失败"
      };

      flag = false;
    });

   
  }
  if(flag){
    ctx.response.body = {
      code: 200,
      msg: "删除成功"
    };
  }

});

//获取单个文章
router.get("/article", async ctx => {
  const id = ctx.query.id,
    sort = ctx.query.sort,
    type = ctx.query.type;
  await getArticleOne(sort, id, type).then(data=>{
  ctx.response.body = {
    code :200,
    data,
    msg : '获取成功'
    
  }
  
 }).catch(err => {
   console.log("err")
    ctx.response.body = {
      code: 500,
      msg: "获取失败"
    };
  });

  
});

//修改文章
router.post("/editarticle", async ctx => {
  let data = ctx.request.body;
  

  const id = data.id,
    sort = data.selectedOptions[0],
    type = data.selectedOptions[1];
  content = data.content;
  title = data.title;
  time = data.time;
  source = data.source;
  author = data.author;

   await editArticle(
    sort,
    title,
    author,
    source,
    time,
    content,
    id,
    type,
    
  ).then(result => {
      ctx.response.body = {
        code: 200,
        msg:'修改成功'
      };
    }).catch(()=>{
    ctx.response.body = {
      code: 500,
      msg: "修改失败"
    };
  });

});

//获取目录
router.get("/catalog", async ctx => {
  const sort = ctx.query.sort;
  const type = ctx.query.type;
  let start = parseInt(ctx.query.start) || 0;
  let result = await getCatalog(sort, type, start);

  if (start === 0) {
    let pageCount = await getNum(sort);
    //一页15条
    if (pageCount % 15 > 0) {
      pageCount = parseInt(pageCount / 15) + 1;
    } else {
      pageCount = pageCount / 15;
    }

    result.pageCount = pageCount;
  }
  ctx.response.body = result;
});

//获取团队列表
router.get("/team/catalog", async ctx => {
 
  let start = parseInt(ctx.query.page) - 1 || 0;
  let result = await getTeam(start);
  
  if (start === 0) {
    let pageCount = await getNum("team");
    //一页20条
    if (pageCount % 20 > 0) {
      pageCount = parseInt(pageCount / 20) + 1;
    } else {
      pageCount = pageCount / 20;
    }

    result.pageCount = pageCount;
  }
  ctx.response.body = result;
});

//获取专家信息
router.get("/team/person", async ctx => {
  const id = ctx.query.id;


  await getPerson(id).then(data=>{
    console.log("sss")
    console.log(data[0].avatar)
    ctx.response.body = {
      code :200,
      data,
      msg : '获取成功'
      
    }
    
   }).catch(err => {
     console.log("err")
      ctx.response.body = {
        code: 500,
        msg: "获取失败"
      };
    });
});

router.post('/team/person/avatar',async ctx =>{
  const {files, fields} = await asyncBusboy(ctx.req);
  
  
  await downImg(files[0]).then(path=>{
    console.log(path)
    ctx.response.body = {
      code :200,
      path,
      msg : '获取成功'
      
    }
    
   }).catch(err => {
     console.log("err")
      ctx.response.body = {
        code: 500,
        msg: "获取失败"
      };
    });;
  
 
})
//增加专家信息
router.post("/team/person", async ctx => {
  let data = ctx.request.body;
  let { name, content, position, avatar } = data;
  

  await saveTeam({name, content, position, avatar}).then((result)=>{
    ctx.response.body = {
      code :200,
      msg : '增加成功'
      
    }
    
   }).catch(err => {
      ctx.response.body = {
        code: 500,
        msg: "增加失败"
      };
    });
    ctx.response.body = {
      code :200,
      msg : '增加成功'
      
    }
});
//修改专家信息
router.post("/team/edit", async ctx => {
  let data = ctx.request.body;
  let { id,name, content, position, avatar } = data;
  
  console.log(id,name, content, position, avatar)
  id = parseInt(id);
  await updatePerson(id,name, content, position, avatar).then((result)=>{
    ctx.response.body = {
      code :200,
      msg : '修改成功'
      
    }
    
   }).catch(err => {
      ctx.response.body = {
        code: 500,
        msg: "增加失败"
      };
    });
   
});


//删除专家
router.post("/team/delete", async ctx => {
  let data = ctx.request.body.person;
  let flag = true;
  for (let i = 0, len = data.length; i < len && flag; i++) {
    const id = parseInt(data[i].id);
    await deletePerson(id).catch(e => {
      console.log("error");
      ctx.response.body = {
        code: 500,
        msg: "删除失败"
      };

      flag = false;
    });

   
  }
  if(flag){
    ctx.response.body = {
      code: 200,
      msg: "删除成功"
    };
  }

});
router.get('/reacherArticle',async ctx =>{
  const title = "%" + ctx.query.title + "%";
  const sort = ctx.query.sort;

  await reacherArticle(sort,title).then(result =>{
    ctx.response.body = {
      data : result,
      code : 200
    }
  
  }).catch(()=>{
    ctx.response.body = {
      code : 500,
      msg : '搜索出现错误'
    }
  })
})
module.exports = router;
