const SQL = require("../config/sql");
const TYPE = require("config-lite")(__dirname).type;
const query = require("../db/db").query;

//储存文章
module.exports.saveArticle = val => query(SQL.saveArticle,val);
//修改文章
module.exports.editArticle = val =>query(SQL.editArticle,val);

//删除文章
module.exports.deleteArticle = val => query(SQL.deleteArticle,val);

//获取单个文章
module.exports.getArticleOne = val => query(SQL.getArticleOne,val)
//搜索文章
module.exports.searchArticle = val => query(SQL.searchArticle,val);
//改变栏目
module.exports.updateArticleColumn = val => query(SQL.updateArticleColumn,val);

module.exports.searchPerson = val => query(SQL.searchPerson,val);
module.exports.updatePersonIndex = val => query(SQL.updatePersonIndex,val);

//搜索类，获取全部结果的条数
module.exports.getSearchNum = async (kind, sort, val, type) => {
  let result = null;
  switch (kind) {
    case "article":
      result = await query(SQL.getReacherNumArticle, [
        val,
        sort,
        type
      ]);
      break;
    default:
      result = await query(SQL.getReacherNumPerson, [sort,val]);
      break;
   
  }
  return result[0]["count(1)"];
};
//获取目录
module.exports.getCatalog = async (sort, type, start) => {
    let title = TYPE[sort].self;
    
      let data = await query(SQL.getCatalog,[sort, type, start]).catch(e => {
        throw e;
      });
    
      return { data, title, sorts: TYPE[sort].childen, sort, code: 200 };
  
 
};
//获取近期热门文章
module.exports.getHotArticle = async sort => {
  let result = await query(SQL.getHotArticle,sort);
  return result.splice(15);
};

//首页获取数据
module.exports.getIndexData = val => query(SQL.getIndexData,val)
  

//获取某栏目文章的总数量
module.exports.getArticlsTotal = async (sort) => {
 
  let  result = await query(SQL.getArticlsTotal,sort);
  
  return result[0]["count(1)"];
};
//获取某栏目文章的总数量
module.exports.getArticleNum = async val => {
  
   let  result = await query(SQL.getArticleNum,val);
   
   return result[0]["count(1)"];
 };
//获取表格条数
module.exports.getNum = async sort => {
  let result = null;

  result = await query(SQL.getNumNoTYPE,sort);
  
  return result[0]["count(1)"];
};

//点赞
module.exports.addPraise = async (sort, id) => {
  result = await query(SQL.addPraise,[sort, id]);
};
//增加浏览数
module.exports.addBrowse = val => query(SQL.addBrowse,val);

//研究团队
module.exports.getTeam = val => query(SQL.getTeam,val);
module.exports.saveTeam = value => query(SQL.saveTeam,value);
module.exports.getPerson = val => query(SQL.getPerson,val);
module.exports.getTeamoOther = val => query(SQL.getTeamoOther,val);
module.exports.deletePerson = val => query(SQL.deletePerson,val);
module.exports.updatePerson = val =>query(SQL.updatePerson,val);
//获取表格条数
module.exports.getPersonNum = async sort => {
  
  result = await query(SQL.getPersonNum,sort);

  return result[0]["count(1)"];
};

/**
 * 存放banner
 * @param {*} sort 
 * @param {*} type 
 * @param {*} id 
 * @param {*} path 
 * @param {*} title 
 * @param {*} flag flag为false表示当前banner有5个，需要删除一个
 */
module.exports.saveBanner =   (sort, type, id, path,title,flag = false) => {
    return new Promise(async(resolve, reject) => {
    try {
        
         if(!flag){
          let result = await query(SQL.geBannerOne); 
          let {id,sort,type} = result[0]
          query(SQL.changeBanner,[sort,0,id,type]); 
          await query(SQL.deleteBanner)
         }
         
          query(SQL.saveBanner,{ sort, type, id, path,title});
      } catch (error) {
        reject(error)
      }
      resolve();
    })
  

};
//获取banner
module.exports.getBanner =  () => query(SQL.getBanner);
module.exports.changeBanner  =  val => query(SQL.changeBanner,val );
module.exports.updateBanner  =  val => query(SQL.updateBanner,val );
module.exports.geBannerOneById  =  val => query(SQL.geBannerOneById,val );
module.exports.updateBannerAll  =  val => query(SQL.updateBannerAll,val );
module.exports.deleteBannerById =  val => query(SQL.deleteBannerById,val);
//增加链接
module.exports.addLink =  val => query(SQL.addLink,val);
//获取链接
module.exports.getLinkCatalog = () => query(SQL.getLinkCatalog);
module.exports.getLink =  id => query(SQL.getLink,id);
module.exports.editLink =  (name,link,id) => query(SQL.editLink,[name,link,id]);
//删除链接
module.exports.deleteLink = id => query(SQL.deleteLink,id);

//后台用户
module.exports.getUser = account => query(SQL.getUser,account);
module.exports.updateUser = pass => query(SQL.changePassword,pass);
module.exports.updateUserTime = val => query(SQL.updateUserTime,val);


//意见反馈
module.exports.saveFeedBack = val => query(SQL.saveFeedBack,val);
module.exports.getFeedBackCatalog = (start) => query(SQL.getFeedBackCatalog,start);
module.exports.setFeedBackRead = id => query(SQL.setFeedBackRead,id);
module.exports.deleteFeedBack = id => query(SQL.deleteFeedBack,id);
module.exports.getFeedBackOne  = id => {

  query(SQL.setFeedBackRead,id);
  return query(SQL.getFeedBackOne,id);
}

module.exports.getIntro = () => query(SQL.getIntro);
module.exports.updateIntro = content => query(SQL.updateIntro,content);


module.exports.getResearchdir = () => query(SQL.getResearchdir);
module.exports.updateResearchdir = val => query(SQL.updateResearchdir,val);

//草稿
module.exports.saveDraft = val => query(SQL.saveDraft,val);
module.exports.getDraft = val => query(SQL.getDraft,val);
module.exports.getDraftOne = val => query(SQL.getDraftOne,val);
module.exports.updateDraft = val => query(SQL.updateDraft,val);
module.exports.deleteDraft = val => query(SQL.deleteDraft,val);
module.exports.updateDraftColumn = val => query(SQL.updateDraftColumn,val);

