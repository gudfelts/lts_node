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
  deleteFeedBack
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
  const isbanner = parseInt(article.isbanner);
  delete article.selectedOptions;
  article.type = type[1];
  article.praise = 0;
  article.browse = 1;
  article.time = article.time.replace(/T.*$/, "");
  try {
    article.img = getImg(article.content);
    article.summary = trimHtml(article.content, {
      preserveTags: false,
      limit: 30
    }).html;

    var { data, path } = await transCode.tranforBase64(article.content);
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

//删除
router.post("/deletearticle", async (ctx, next) => {
  let data = ctx.request.body.article;
  let sort = ctx.request.body.sort;

  for (let i = 0, len = data.length; i < len; i++) {
    const id = data[i].id,
      type = data[i].type;
    if (data[i].isbanner) {

        let banner = await getBanner();
        console.log(banner.length)
        if(banner.length === 3){
          if(len > 1){
            console.log("1")
            
            ctx.response.body = {
              code: 500,
              msg: "删除失败，第"+(i+1)+"篇文章为轮播图，目前轮播图少于四个"
            };
            return ;
          }else{
            console.log("2")
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
    console.log("3")
    
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
    type = parseInt(article.selectedOptions[1]);

  isbanner = parseInt(article.isbanner);
  content = article.content;
  title = article.title;
  time = article.time;
  source = article.source;
  author = article.author;
  img = getImg(content);
    var { data, path } = await transCode.tranforBase64(content);
    console.log(path);
    await editArticle([
      sort,
      title,
      author,
      source,
      time,
      content,
      img,
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
    console.log(banner)
    console.log(banner.length)
    
    //之前是轮播图
    if(result.length > 0){
      console.log("是轮播图")

        //取消轮播
        if(isbanner == 0){
          console.log("取消轮播")
          
          //总轮播图小于4个时，拒绝取消
          if(banner.length < 4){
            console.log("小于4个")
            ctx.response.body = {
              code: 500,
              msg: "总轮播图小于3个!"
            };
            return;
          }else{
            console.log("合适")
      
            changeBanner([sort,isbanner,id,type]);

            //之前是轮播图，则删掉之前的数据
            deleteBannerById([id, sort]);
          }
         
          
        }else{
      console.log("保持轮播")
      
          updateBanner([type, path, title,id,sort]).catch(e => {
            throw e;
          });
        
        }
    //之前不是轮播图    
    }else{
      console.log("之前不是轮播图")
      changeBanner([sort,isbanner,id,type]);
      
      if(banner.length === 5){
      console.log("刚好5个")
      
        saveBanner(sort, type, id, path, title,false);
      
      }else{
      console.log("7")
      
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

  await downImg(files[0])
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
router.get("/team/reacher", async ctx => {
  const name = "%" + ctx.query.title + "%";

  let start = parseInt(ctx.query.start) || 0;

  await reacherPerson(name, start)
    .then(async result => {
      if (start === 0) {
        var pageCount = await getSearchNum("person", name);
        //一页15条
      }

      result.pageCount = pageCount;
      result.code = 200;
      ctx.response.body = result;
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
  console.log(id);
  await getLink(id)
    .then(data => {
      console.log(data);
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
  console.log(data);
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
  console.log(name, link, id);
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
  console.log(data);
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
module.exports = router;
