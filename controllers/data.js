
const router = require("koa-router")();
const matchImg = require("../utils/matchImg");
const downImg = require("../utils/downImg");
const matchBanner = require("../utils/matchBanner");
const asyncBusboy = require("async-busboy");
const trimHtml = require("../utils/trim-html");
// import {format} from 'date-fns/esm'
const {
  saveArticle,
  deleteArticle,
  getArticleOne,
  getArticleIsBanner,
  editArticle,
  getArticleNum,
  updateArticleColumn,
  getTeam,
  getPerson,
  saveTeam,
  updatePerson,
  deletePerson,
  exchangePersonIndex,
  getCatalog,
  getNum,
  saveBanner,
  getBanner,
  geBannerOneById,
  deleteBannerById,
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
  deleteFeedBack,
  getIntro,
  updateIntro,
  searchPerson,
  getResearchdir,
  updateResearchdir,
  saveDraft,
  getDraft,
  getDraftOne,
  updateDraft,
  deleteDraft,
  updateDraftColumn
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
  const indexbanner = parseInt(article.indexbanner);
  const isbanner = parseInt(article.isbanner);
  delete article.selectedOptions;
  delete article.indexbanner;
  article.type = type[1];
  article.sort = type[0];
  article.praise = 0;
  article.browse = 1;
  console.log(isbanner)
  article.time = article.time.replace(/T.*$/, "");

  try {
    article.summary = trimHtml(article.content, {
      preserveTags: false,
      limit: 30
    }).html;

    var { data, path } = await matchImg(article.content, indexbanner, isbanner);
    article.content = data;
    article.img = path;
    const result = await saveArticle(article);
    const id = result.insertId;
    //储存banner
    if (isbanner === 1) {
      let banner = await geBanner();
      if (banner.length === 5) {
        saveBanner(id, path, article.title, false);
      } else {
        saveBanner(id, path, article.title, true);
      }
    }

    ctx.response.body = {
      code: 200,
      msg: "发布文章成功"
    };
  } catch (error) {
    ctx.response.body = {
      code: 500,
      msg: "发布文章失败!"
    };
    throw error;
    return;
  }
});
//上传文章图片
router.post("/article/uploadImg", async ctx => {
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
      console.log(err);
      ctx.response.body = {
        code: 500,
        msg: "获取失败"
      };
    });
});
//删除
router.post("/article/delete", async (ctx, next) => {
  let data = ctx.request.body.article;
  let sort = ctx.request.body.sort;

  for (let i = 0, len = data.length; i < len; i++) {
    const id = data[i].id,
      type = data[i].type;
    if (data[i].isbanner) {
      let banner = await getBanner();

      if (banner.length === 3) {
        if (len > 1) {
          ctx.response.body = {
            code: 500,
            msg: "删除失败，第" + (i + 1) + "篇文章为轮播图，目前轮播图少于四个"
          };
          return;
        } else {
          ctx.response.body = {
            code: 500,
            msg: "删除失败，目前轮播图少于四个"
          };
          return;
        }
      } else {
        deleteBannerById(id);
      }
    }

    await deleteArticle([sort, id, type])
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
  await getArticleOne(id)
    .then(async data => {
      data = data[0];
      const isbanner = parseInt(data.isbanner);
      let indexbanner = 0;

      //了解该文章的banner图为第几张
      if (isbanner) {
        let banner = await geBannerOneById(data.id);
        indexbanner = matchBanner(data.content, banner[0].path);
        data.indexbanner = indexbanner;
      }
      data.sort = sort;
      data.indexbanner = indexbanner;

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
//搜索文章
router.get("/article/search", async (ctx, next) => {
  const title = "%" + ctx.query.title + "%";
  const sort = ctx.query.sort;
  const type = parseInt(ctx.query.type);
  let start = parseInt(ctx.query.start) || 0;
  await searchArticle([title, type, sort, start])
    .then(async result => {
      if (start == 0) {
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
router.post("/article/edit", async ctx => {
  let article = ctx.request.body,
      id = parseInt(article.id),
      indexbanner = parseInt(article.indexbanner),
      isbanner = parseInt(article.isbanner);
  
  let content = article.content,
    title = article.title,
    time = article.time,
    source = article.source,
    author = article.author;

  article = await getArticleIsBanner(id);
  let isbannerOld = article[0].isbanner;
  let path  = await matchImg(content, indexbanner, isbanner);
  editArticle([title,author,source,time,content,path,isbanner,id]);
  
  if(isbannerOld == 1){
    //以前是banner
    if(isbanner == 1){
      updateBanner([path, title, id]).catch(e => {
        throw e;
      });
    }else{
      deleteBannerById(id);
    }
  }else{
    //以前不是banner
     let bannerNum = await getNum('banner'); 
     if(isbanner == 1){

     if(bannerNum === 5){
      saveBanner(id, path, title, false);
     }else{
      saveBanner(id, path, title, true);
      
     }
  } }

  ctx.response.body = {
    code: 200,
    msg: "修改成功"
  };
});

//获取文章目录
router.get("/article/catalog", async (ctx, next) => {
  const sort = ctx.query.sort;
  const type = ctx.query.type;
  let start = parseInt(ctx.query.start) || 0;

  try {
    await getCatalog(sort, type, start).then(async result => {
      let pageCount = 0;
      if (start === 0) {
        pageCount = await getArticleNum([sort, type]);
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
  
  let sortNEW = ctx.request.body.column[0];
  let typeNEW = ctx.request.body.column[1];

  for (let i = 0, len = data.length; i < len; i++) {
    const id = data[i].id;

    const result = await  updateArticleColumn([sortNEW, typeNEW,id]);
       
    if (i === len - 1) {
      ctx.response.body = {
        code: 200,
        msg: "转移成功"
      };
    }
  }
});
//获取研究团队列表
router.get("/team/catalog", async ctx => {
  let start = parseInt(ctx.query.start) || 0;
  let sort = ctx.query.sort;
  try {
    let list = await getTeam([sort,start]);
    //一页20条
    if (start === 0) {
      var pageCount = await getNum(sort);
    }

    ctx.response.body = {
      code: 200,
      msg: "获取成功",
      list,
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
  const sort = ctx.query.sort;

  await getPerson([sort,id])
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
  await downImg(files[0], "person")
    .then(path => {
      ctx.response.body = {
        code: 200,
        path,
        msg: "获取成功"
      };
    })
    .catch(err => {
      console.error(err);
      ctx.response.body = {
        code: 500,
        msg: "获取失败"
      };
    });
});
//增加专家信息
router.post("/team/person", async ctx => {
  let data = ctx.request.body;
  let { name, content, position, avatar,sort } = data;
  const summary = trimHtml(content, { preserveTags: false, limit: 70 }).html;
  const rank = await getNum(sort);

  await saveTeam([sort,{ name, content, position, avatar, summary, rank }])
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
//修改专家顺序
router.post("/team/rank", async ctx => {
  let id = parseInt(ctx.request.body.id[0]);
  let rank = parseInt(ctx.request.body.rank[0]);
  let sort = parseInt(ctx.request.body.sort);

  awaitexchangePersonIndex([sort,rank, id])
    .then(async () => {
      id = parseInt(ctx.request.body.id[1]);
      rank = parseInt(ctx.request.body.rank[1]);
      awaitexchangePersonIndex([sort,rank, id])
        .then(() => {
          ctx.response.body = {
            code: 200,
            msg: "修改成功"
          };
        })
        .catch(e => {
          ctx.response.body = {
            code: 400,
            msg: "修改失败"
          };
          throw e;
        });
    })
    .catch(e => {
      ctx.response.body = {
        code: 400,
        msg: "修改失败"
      };
      throw e;
    });
});

//修改专家信息
router.post("/team/edit", async ctx => {
  let data = ctx.request.body;
  let { id, name, content, position, avatar,sort } = data;
  const summary = trimHtml(content, { preserveTags: false, limit: 70 }).html;
  console.log(id, name, content, position, avatar,sort)
  id = parseInt(id);

  await updatePerson([sort, name, position, content, avatar, summary,id])
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
//搜索专家
router.get("/team/search", async ctx => {
  const name = "%" + ctx.query.name + "%";
  const sort = ctx.query.sort;
  let start = parseInt(ctx.query.start) || 0;
  console.log(sort)
  await searchPerson([sort,name, start])
    .then(async result => {
      if (start === 0) {
        var pageCount = await getSearchNum(sort, sort, name);
        //一页15条
      }

      ctx.response.body = {
        list: result,
        pageCount,
        code: 200
      };
    })
    .catch((e) => {
      ctx.response.body = {
        code: 500,
        msg: "搜索出现错误"
      };
      throw e;
    });
});
//删除专家
router.post("/team/delete", async ctx => {
  let data = ctx.request.body.list;
  let sort = ctx.request.body.sort;
  for (let i = 0, len = data.length; i < len; i++) {
    const id = parseInt(data[i].id);
    await deletePerson([sort,id])
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
//网站本院简介
router.get("/intro", async ctx => {
  await getIntro()
    .then(data => {
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

//修改本院简介
router.post("/intro", async ctx => {
  let article = ctx.request.body;

  await updateIntro(article.content)
    .then(() => {
      ctx.response.body = {
        code: 200,
        msg: "修改成功"
      };
    })
    .catch(e => {
      ctx.response.body = {
        code: 500,
        msg: "更新失败!"
      };
      throw e;
    });
});

//研究方向
router.get("/researchdir", async ctx => {
  const data = await getResearchdir();

  ctx.response.body = {
    content: data[0].content,
    code: 200,
    msg: "成功"
  };
});
//修改研究方向
router.post("/researchdir", async ctx => {
  let article = ctx.request.body;
  await updateResearchdir(article.content)
    .then(() => {
      ctx.response.body = {
        code: 200,
        msg: "修改成功"
      };
    })
    .catch(e => {
      ctx.response.body = {
        code: 500,
        msg: "更新失败!"
      };
      throw e;
    });
});

//存储草稿
router.post("/draft", async ctx => {
  let article = ctx.request.body;
  article.type = parseInt(article.type);
  article.time = article.time.replace(/T.*$/, "");
  // const draftTime = format(new Date(2014, 1, 11), 'MM/DD/YYYY')
  try {
    await saveDraft(article);

    ctx.response.body = {
      code: 200,
      msg: "成功"
    };
  } catch (error) {
    ctx.response.body = {
      code: 500,
      msg: "上传文章失败!"
    };
    throw error;
    return;
  }
});
//更新草稿
router.post("/draft/update", async ctx => {
  let article = ctx.request.body;
  id = article.id;
  delete article.id;

  article.time = article.time.replace(/T.*$/, "");

  try {
    await updateDraft([
      article.title,
      article.content,
      article.time,
      article.source,
      article.author,
      id
    ]);

    ctx.response.body = {
      code: 200,
      msg: "更新成功"
    };
  } catch (error) {
    ctx.response.body = {
      code: 500,
      msg: "更新草稿失败!"
    };
    throw error;
    return;
  }
});
//获取单个草稿
router.get("/draft", async ctx => {
  const id = ctx.query.id;

  await getDraftOne(id)
    .then(async data => {
      ctx.response.body = {
        code: 200,
        data: data[0],
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
//获取草稿目录
router.get("/draft/catalog", async (ctx, next) => {
  let start = parseInt(ctx.query.start) || 0;

  try {
    await getDraft(start).then(async data => {
      let pageCount = 0;
      if (start === 0) {
        pageCount = await getNum("draft");
        //一页15条
      }
      ctx.response.body = {
        data,
        pageCount,
        code: 200,
        msg: "获取成功"
      };
    });
  } catch (error) {
    console.log(error);
    ctx.response.body = {
      code: 201,
      msg: "搜索出现错误"
    };
  }
});
//直接发布草稿
router.get("/draft/publish", async (ctx, next) => {
  let id = parseInt(ctx.query.id);

  let result = await getDraftOne(id);
  let article = result[0];
  sort = article.sort;
  idDraft = article.id;
  delete article.sort;
  delete article.id;

  article.isbanner = 0;
  article.praise = 0;
  article.browse = 1;

  article.summary = trimHtml(article.content, {
    preserveTags: false,
    limit: 30
  }).html;
  try {
    let { data, path } = await matchImg(article.content);
    article.content = data;
    article.img = path;
    await saveArticle(sort, article);
    await deleteDraft(idDraft);
    ctx.response.body = {
      code: 200,
      msg: "发布文章成功"
    };
  } catch (error) {
    console.log(error);
    ctx.response.body = {
      code: 500,
      msg: "发布文章失败!"
    };
  }
});
//删除目录
router.post("/draft/delete", async ctx => {
  let data = ctx.request.body.article;

  for (let i = 0, len = data.length; i < len; i++) {
    const id = data[i].id;

    await deleteDraft(id)
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
//草稿改变栏目
router.get("/draft/batchMove", async (ctx, next) => {
  let id = parseInt(ctx.query.id);
  let sort = ctx.query.sort;
  let type = parseInt(ctx.query.type);

  await updateDraftColumn([sort, type, id])
    .then(value => {
      ctx.response.body = {
        code: 200,
        msg: "转移成功"
      };
    })
    .catch(e => {
      ctx.response.body = {
        code: 500,
        msg: "转移失败"
      };
      throw e;
    });
});
module.exports = router;
