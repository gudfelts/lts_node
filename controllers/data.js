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
  searchArticle,
  getSearchNum,
  getLinkCatalog,
  deleteLink,
  addLink,
  getLink,
  editLink,
  getFeedBackCatalog,
  getFeedBackOne,
  setFeedBackRead
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
  const isBanner = article.isBanner;

  delete article.selectedOptions;
  delete article.isBanner;
  article.type = type[1];
  article.praise = 0;
  article.browse = 0;
  article.time = article.time.replace(/T.*$/, "");
  try {
  article.img = getImg(article.content);
  article.summary = trimHtml(article.content, { preserveTags: false, limit: 30 }).html;
   
  var { data, path } = await transCode.tranforIndex(article.content);
    article.content = data;

    const result = await saveArticle(type[0], article);
    const id  = result.insertId;
    //储存banner
    if (isBanner !== "false") {
      saveBanner(type[0], article.type, id, path, article.title);
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
  const banner = await getBanner();
  await getArticleOne(sort, id, type)
    .then(data => {
      data[0].sort = sort;
      let result = banner.filter(item => {
        if (data[0].id == item.id && data[0].sort == item.sort) {
          return 1;
        }
      });
      result.length > 0
        ? (data[0].isBanner = true)
        : (data[0].isBanner = false);
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
    .catch((e) => {
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
  isBanner = article.isBanner;
  content = article.content;
  title = article.title;
  time = article.time;
  source = article.source;
  author = article.author;
  img = getImg(content);
  
  try {
    var { data, path } = await transCode.tranforIndex(content);
    await editArticle([sort, title, author, source, time, content,img, id, type]);
    //储存banner
    if (isBanner === "true") {
      saveBanner(sort, type, id, path, title);
    } else {
      //如果是false，应该检测他之前是否是轮播图
      getBanner().then(banner=>{
        let result = banner.filter(item => {
          if (id == item.id && sort == item.sort) {
            return 1;
          }
        });

        if( result.length > 0){
          deleteBannerById([id,sort])
        }
      });
     
    }

    ctx.response.body = {
      code: 200,
      msg: "修改成功"
    };
  } catch (error) {
    throw error;
    console.log(error);
    ctx.response.body = {
      code: 500,
      msg: "修改文章失败!"
    };
    return;
  }
});

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
    let person= await getTeam(start);
    //一页20条
    if (start === 0) {
      var pageCount = await getNum("team");
    }
    
    ctx.response.body ={
      code : 200,
      msg  :'获取成功',
      person,
      pageCount
    }
  } catch (error) {
    console.log(error)
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
      console.log(err)
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

  const pageCount = await getNum('friendlinks');
  
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
  const pageCount = await getNum('feedback');
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
      console.log(err)
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
        feed : feed[0],
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
module.exports = router;
