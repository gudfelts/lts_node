const router = require("koa-router")();
const transCode = require("../utils/transCode");
const getImg = require("../utils/getImg");
const downImg = require("../utils/downImg");
const asyncBusboy = require("async-busboy");
const trimHtml = require("../utils/trim-html");

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
  getBanner,
  deleteBannerById,
  changeBanner,
  updateBanner,
  updateBannerAll,
  searchArticle,
  getSearchNum,
  getLinkCatalog,
  deleteLink,
  addLink,
  getLink,
  editLink,
  getFeedBackCatalog,
  getFeedBackOne,
  setFeedBackRead,
  deleteFeedBack,
  getIntro,
  updateIntro,
  searchPerson,
  getResearchdir,
  updateResearchdir
} = require("../model/OperationData");

/* HTTP动词
    GET     //查询
    POST    //新建
    PUT     //替换
    PATCH   //更新部分属性
    DELETE  //删除指定ID的文档
*/

//存储文章
router.post("/article", async ctx => {
  let article = ctx.request.body;
  const type = article.selectedOptions;
  const indexBanner = parseInt(article.indexBanner);
  const isbanner = parseInt(article.isbanner);
  delete article.selectedOptions;
  delete article.indexBanner;
  article.type = type[1];
  article.praise = 0;
  article.browse = 1;
  console.log(article.time)
  
  article.time = article.time.replace(/T.*$/, "");
  console.log(article.time)
  
  try {
    article.summary = trimHtml(article.content, {
      preserveTags: false,
      limit: 30
    }).html;

    var { data, path } = await transCode.tranforBase64(article.content,indexBanner);
    article.content = data;
    article.img = path;
    const result = await saveArticle(type[0], article);
    const id = result.insertId;
    //储存banner
    if (isbanner === 1) {
      let banner = await getBanner();
      if(banner.length === 5){

        saveBanner(type[0], article.type, id, path, article.title,false);
      }else{
        saveBanner(type[0], article.type, id, path, article.title,true);
        
      }
    }

    ctx.response.body = {
      code: 200,
      msg: "成功"
    };
  } catch (error) {
    ctx.response.body = {
      code: 500,
      msg: "上传文章失败!"
    };
    return;
  }
});
//上传文章图片
router.post("/article/uploadImg", async ctx => {
  const { files, fields } = await asyncBusboy(ctx.req);
  
  await downImg(files[0],'article')
    .then(path => {
      console.log(path)
      ctx.response.body = {
        code: 200,
        path,
        msg: "获取成功"
      };
    })
    .catch(err => {
      console.log(err);
      ctx.response.body = {
        code: 500,
        msg: "获取失败"
      };
    });
});
//删除
router.post("/deletearticle", async (ctx, next) => {
  let data = ctx.request.body.article;
  let sort = ctx.request.body.sort;

  for (let i = 0, len = data.length; i < len; i++) {
    const id = data[i].id,
      type = data[i].type;
    if (data[i].isbanner) {

        let banner = await getBanner();
      
        if(banner.length === 3){
          if(len > 1){
            
            ctx.response.body = {
              code: 500,
              msg: "删除失败，第"+(i+1)+"篇文章为轮播图，目前轮播图少于四个"
            };
            return ;
          }else{
            ctx.response.body = {
              code: 500,
              msg: "删除失败，目前轮播图少于四个"
            };
            return;
          }
          
        }else{
        
          deleteBannerById([id, sort]);
      
        }
      
    }
    
    await deleteArticle(sort, id, type)
      .then(() => {
        if (i === len - 1) {
          ctx.response.body = {
            code: 200,
            msg: "删除成功"
          };
        }
      })
      .catch(e => {
        ctx.response.body = {
          code: 500,
          msg: "删除失败"
        };
      });
  }
});

//获取单个文章
router.get("/article", async ctx => {
  const id = ctx.query.id,
    sort = ctx.query.sort,
    type = ctx.query.type;

  //获取当前banner
  await getArticleOne(sort, id, type)
    .then(data => {
      data[0].sort = sort;
      
      ctx.response.body = {
        code: 200,
        data: data[0],
        msg: "获取成功"
      };
    })
    .catch(err => {
      ctx.response.body = {
        code: 500,
        msg: "获取失败"
      };
    });
});
//搜索文章
router.get("/searchArticle", async (ctx, next) => {
  const title = "%" + ctx.query.title + "%";
  const sort = ctx.query.sort;
  const type = parseInt(ctx.query.type);
  let start = parseInt(ctx.query.start) || 0;

  await searchArticle(sort, title, type, start)
    .then(async result => {
      if (start === 0) {
        var pageCount = await getSearchNum("article", sort, title, type);
        //一页15条
      }
      ctx.response.body = {
        data: result,
        pageCount,
        code: 200
      };
    })
    .catch(e => {
      throw e;
      ctx.response.body = {
        code: 500,
        msg: "搜索出现错误"
      };
    });
});
//修改文章
router.post("/editarticle", async ctx => {
  let article = ctx.request.body;
  const id = parseInt(article.id),
    sort = article.selectedOptions[0],
    type = parseInt(article.selectedOptions[1]),
    indexBanner = parseInt(article.indexBanner),
    isbanner = parseInt(article.isbanner);
  delete article.indexBanner;

  content = article.content,
  title = article.title,
  time = article.time,
  source = article.source,
  author = article.author;

  let { data, path } = await transCode.tranforBase64(content,indexBanner);
  img = path;
    
    await editArticle([
      sort,
      title,
      author,
      source,
      time,
      content,
      path,
      type,
      id
    ]);
    //true表示之前是轮播图，false表示之前不是轮播图
    let flag = true;
    //检测他之前是否是轮播图
    let banner = await getBanner();
    let result = banner.filter(item => {
      if (id == item.id && sort == item.sort) {
        return 1;
      }
    });
    
    //之前是轮播图
    if(result.length > 0){

        //取消轮播
        if(isbanner == 0){
          
          //总轮播图小于4个时，拒绝取消
          if(banner.length < 4){
            ctx.response.body = {
              code: 500,
              msg: "总轮播图小于3个!"
            };
            return;
          }else{
      
            changeBanner([sort,isbanner,id,type]);

            //之前是轮播图，则删掉之前的数据
            deleteBannerById([id, sort]);
          }
         
          
        }else{
          updateBanner([type, path, title,id,sort]).catch(e => {
            throw e;
          });
        
        }
    //之前不是轮播图    
    }else{
      changeBanner([sort,isbanner,id,type]);
      
      if(banner.length === 5){
        
        saveBanner(sort, type, id, path, title,false);
      
      }else{
      
        saveBanner(sort, type, id, path, title,true);
        
      }
      
    }
  
    ctx.response.body = {
      code: 200,
      msg: "修改成功"
    };
  
  
})

//获取文章目录
router.get("/catalog", async (ctx, next) => {
  const sort = ctx.query.sort;
  const type = ctx.query.type;
  let start = parseInt(ctx.query.start) || 0;

  try {
    await getCatalog(sort, type, start).then(async result => {
      let pageCount = 0;
      if (start === 0) {
        pageCount = await getNum(sort, type);
        //一页15条
      }
      result.pageCount = pageCount;
      result.code = 200;
      ctx.response.body = result;
    });
  } catch (error) {
    console.log(error);
    ctx.response.body = {
      code: 201,
      msg: "搜索出现错误"
    };
  }
});
//修改栏目
router.post("/article/batchMove", async (ctx, next) => {
  let data = ctx.request.body.article;
  let sort = ctx.request.body.sort;
  let type = ctx.request.body.type;
  let sortNEW =  ctx.request.body.column[0]
  let typeNEW = ctx.request.body.column[1];

  for (let i = 0, len = data.length; i < len; i++) {
    const id = data[i].id;
    
      let articles = await getArticleOne(sort, id, type);
      const article = articles[0];
      article.type = parseInt(typeNEW);
     
      await deleteArticle(sort, id, type);
      
      article.id = null;
      let result = await saveArticle(sortNEW, article);
      const idNEW =parseInt(result.insertId);
    if (article.isbanner) {
      updateBannerAll([typeNEW,sortNEW,idNEW,id,sort]).catch(e => {
        throw e;
      });
        
      
    }
    if (i === len - 1) {
      ctx.response.body = {
        code: 200,
        msg: "转移成功"
      };
    }
  }

 
});
//获取团队列表
router.get("/team/catalog", async ctx => {
  let start = parseInt(ctx.query.start) || 0;

  try {
    let person = await getTeam(start);
    //一页20条
    if (start === 0) {
      var pageCount = await getNum("team");
    }

    ctx.response.body = {
      code: 200,
      msg: "获取成功",
      person,
      pageCount
    };
  } catch (error) {
    console.log(error);
    ctx.response.body = {
      msg: "搜索失败",
      code: 500
    };
  }
});

//获取专家信息
router.get("/team/person", async ctx => {
  const id = ctx.query.id;

  await getPerson(id)
    .then(data => {
      ctx.response.body = {
        code: 200,
        data,
        msg: "获取成功"
      };
    })
    .catch(err => {
      console.log(err);
      ctx.response.body = {
        code: 500,
        msg: "获取失败"
      };
    });
});

//上传头像
router.post("/team/person/avatar", async ctx => {
  const { files, fields } = await asyncBusboy(ctx.req);

  await downImg(files[0],'person')
    .then(path => {
      ctx.response.body = {
        code: 200,
        path,
        msg: "获取成功"
      };
    })
    .catch(err => {
      ctx.response.body = {
        code: 500,
        msg: "获取失败"
      };
    });
});
//增加专家信息
router.post("/team/person", async ctx => {
  let data = ctx.request.body;
  let { name, content, position, avatar } = data;
  const summary = trimHtml(content, { preserveTags: false, limit: 70 }).html;

  let result = await transCode.tranforBase64(content);
  content = result.data;
  await saveTeam({ name, content, position, avatar, summary })
    .then(result => {
      ctx.response.body = {
        code: 200,
        msg: "增加成功"
      };
    })
    .catch(err => {
      ctx.response.body = {
        code: 500,
        msg: "增加失败"
      };
    });
  ctx.response.body = {
    code: 200,
    msg: "增加成功"
  };
});

//上传文章图片
router.post("/person/uploadImg", async ctx => {
  const { files, fields } = await asyncBusboy(ctx.req);
  
  await downImg(files[0],'person')
    .then(path => {
      
      ctx.response.body = {
        code: 200,
        path,
        msg: "获取成功"
      };
    })
    .catch(err => {
      console.log(err);
      ctx.response.body = {
        code: 500,
        msg: "获取失败"
      };
    });
});
//修改专家信息
router.post("/team/edit", async ctx => {
  let data = ctx.request.body;
  let { id, name, content, position, avatar } = data;
  const summary = trimHtml(content, { preserveTags: false, limit: 70 }).html;

  let result = await transCode.tranforBase64(content);
  content = result.data;
  id = parseInt(id);

  await updatePerson(id, name, content, position, avatar, summary)
    .then(result => {
      ctx.response.body = {
        code: 200,
        msg: "修改成功"
      };
    })
    .catch(err => {
      ctx.response.body = {
        code: 500,
        msg: "增加失败"
      };
    });
});

//搜索专家
router.get("/team/search", async ctx => {
  const name = "%" + ctx.query.name + "%";
  let start = parseInt(ctx.query.start) || 0;

  await searchPerson(name, start)
    .then(async result => {
      if (start === 0) {
        var pageCount = await getSearchNum("person", null, name);
        //一页15条
      }
     

      ctx.response.body = {
        persons: result,
        pageCount,
        code: 200
      };
    })
    .catch(() => {
      ctx.response.body = {
        code: 500,
        msg: "搜索出现错误"
      };
      next();
      return;
    });
});
//删除专家
router.post("/team/delete", async ctx => {
  let data = ctx.request.body.person;
  for (let i = 0, len = data.length; i < len; i++) {
    const id = parseInt(data[i].id);
    await deletePerson(id)
      .then(() => {
        if (i === len - 1) {
          ctx.response.body = {
            code: 200,
            msg: "删除成功"
          };
        }
      })
      .catch(e => {
        ctx.response.body = {
          code: 500,
          msg: "删除失败"
        };
      });
  }
});

//获取友情链接信息目录
router.get("/friendLinks/catalog", async ctx => {
  const pageCount = await getNum("friendlinks");

  await getLinkCatalog()
    .then(links => {
      ctx.response.body = {
        code: 200,
        links,
        pageCount,
        msg: "获取成功"
      };
    })
    .catch(err => {
      ctx.response.body = {
        code: 500,
        msg: "获取失败"
      };
    });
});
//获取友情链接信息
router.get("/friendLinks/one", async ctx => {
  const id = ctx.query.id;
  await getLink(id)
    .then(data => {
      ctx.response.body = {
        code: 200,
        data,
        msg: "获取成功"
      };
    })
    .catch(err => {
      ctx.response.body = {
        code: 500,
        msg: "获取失败"
      };
    });
});

//删除链接
router.post("/friendLinks/delete", async ctx => {
  let data = ctx.request.body.links;
  for (let i = 0, len = data.length; i < len; i++) {
    const id = parseInt(data[i].id);
    await deleteLink(id)
      .then(() => {
        if (i === len - 1) {
          ctx.response.body = {
            code: 200,
            msg: "删除成功"
          };
        }
      })
      .catch(e => {
        ctx.response.body = {
          code: 500,
          msg: "删除失败"
        };
      });
  }
});

//增加链接信息
router.post("/friendLinks/post", async ctx => {
  let data = ctx.request.body;
  let { name, link } = data;

  await addLink({ name, link })
    .then(result => {
      ctx.response.body = {
        code: 200,
        msg: "增加成功"
      };
    })
    .catch(err => {
      ctx.response.body = {
        code: 500,
        msg: "增加失败"
      };
    });
});
//修改链接信息
router.post("/friendLinks/edit", async ctx => {
  let data = ctx.request.body;
  let { name, link, id } = data;
  id = parseInt(id);
  await editLink(name, link, id)
    .then(result => {
      ctx.response.body = {
        code: 200,
        msg: "修改成功"
      };
    })
    .catch(err => {
      ctx.response.body = {
        code: 500,
        msg: "修改失败"
      };
    });
});

//获取意见反馈目录
router.get("/feedback/catalog", async ctx => {
  const start = parseInt(ctx.query.start);
  const pageCount = await getNum("feedback");
  await getFeedBackCatalog(start)
    .then(feedback => {
      ctx.response.body = {
        code: 200,
        feedback,
        pageCount,
        msg: "获取成功"
      };
    })
    .catch(err => {
      console.log(err);
      ctx.response.body = {
        code: 500,
        msg: "获取失败"
      };
    });
});
//获取意见反馈
router.get("/feedback/one", async ctx => {
  const id = ctx.query.id;
  await getFeedBackOne(id)
    .then(feed => {
      setFeedBackRead(id);
      ctx.response.body = {
        code: 200,
        feed: feed[0],
        msg: "获取成功"
      };
    })
    .catch(err => {
      ctx.response.body = {
        code: 500,
        msg: "获取失败"
      };
    });
});
//删除意见反馈
router.post("/feedback/delete", async ctx => {
  let data = ctx.request.body.feed;
  for (let i = 0, len = data.length; i < len; i++) {
    const id = parseInt(data[i].id);
    await deleteFeedBack(id)
      .then(() => {
        if (i === len - 1) {
          ctx.response.body = {
            code: 200,
            msg: "删除成功"
          };
        }
      })
      .catch(e => {
        ctx.response.body = {
          code: 500,
          msg: "删除失败"
        };
      });
  }
});
//网站简介
router.get("/intro", async ctx => {
  
await getIntro().then(data => {
      ctx.response.body = {
        code: 200,
        content: data[0].content,
        msg: "获取成功"
      };
    })
    .catch(err => {
      ctx.response.body = {
        code: 500,
        msg: "获取失败"
      };
    });
});

router.post("/intro", async ctx => {
    let article = ctx.request.body;
    let { data, path } = await transCode.tranforBase64(article.content);
    const content = data;
    const result = await updateIntro(content);
   
    ctx.response.body = {
      code: 200,
      msg: "成功"
    };
  // } catch (error) {
  //   ctx.response.body = {
  //     code: 500,
  //     msg: "上传文章失败!"
  //   };
  //   return;
  // }
});
//研究方向
router.get('/researchdir',async ctx=>{
  const data = await getResearchdir();

  ctx.response.body = {
    content : data[0].content,
    code: 200,
    msg: "成功"
  };
})
router.post('/researchdir',async ctx=>{
  let article = ctx.request.body;
  console.log(article)
  let { data, path } = await transCode.tranforBase64(article.content);
  const content = data;
  const result = await updateResearchdir(content);
 
  ctx.response.body = {
    code: 200,
    msg: "成功"
  };
})
module.exports = router;
