const SQL = require("../config/sql");
const TYPE = require("config-lite")(__dirname).type;
const query = require("../db/db").query;

//储存文章
module.exports.saveArticle = (sort, val) => query(SQL.saveArticle,[sort, val]);
//修改文章
module.exports.editArticle = (val) =>query(SQL.editArticle,val);

//删除文章
module.exports.deleteArticle = (sort, id, type) => query(SQL.deleteArticle,[sort, id, type]);

//获取单个文章
module.exports.getArticleOne = (sort, id, type) => query(SQL.getArticleOne,[sort, id, type])
//搜索文章
module.exports.searchArticle = (sort, title, type, start) => query(SQL.searchArticle,[sort, title, type, start]);

module.exports.searchPerson = (name, start) => query(SQL.searchPerson,[name, start]);

//搜索类，获取全部结果的条数
module.exports.getSearchNum = async (kind, sort, val, type) => {
  let result = null;
  switch (kind) {
    case "article":
      result = await query(SQL.getReacherNumArticle, [
        sort,
        val,
        type
      ]);
      break;
    case "person":
      result = await query(SQL.getReacherNumPerson, val);
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
module.exports.getIndex = (val) => query(SQL.getIndexData,val)
  


module.exports.getAllNum = async (sort) => {
 
    result = await query(SQL.getAllNum,sort);
  
  return result[0]["count(1)"];
};
//获取表格条数
module.exports.getNum = async (sort,type = false) => {
  let result = null;
  if(type === false){
      result = await query(SQL.getNumNoTYPE,sort);
  }
  else{
      result = await query(SQL.getNum,[sort,type]);
  }

  return result[0]["count(1)"];
};

//点赞
module.exports.addPraise = async (sort, id) => {
  result = await query(SQL.addPraise,[sort, id]);
};
//增加浏览数
module.exports.addBrowse = (sort, id, type) => query(SQL.addBrowse,[sort, id, type]);

//专家团队
module.exports.getTeam = start => query(SQL.getTeam,start);
module.exports.saveTeam = value => query(SQL.saveTeam,value);
module.exports.getPerson = id => query(SQL.getPerson,id);
module.exports.getTeamoOther = id => query(SQL.getTeamoOther,id);
module.exports.deletePerson = id => query(SQL.deletePerson,id);
module.exports.updatePerson = (id, name, content, position, avatar,summary) =>query(SQL.updatePerson,[name, position, content, avatar,summary, id]);

//存放banner
module.exports.saveBanner =   (sort, type, id, path,title,flag = false) => {
    return new Promise(async(resolve, reject) => {
    try {
        
         if(!flag){
          let result = await query(SQL.getDeleteBannerID); 
          let {id,sort,type} = result[0]
          console.log(id,sort,type)
          query(SQL.changeBanner,[sort,0,id,type]); 
          await query(SQL.deleteBanner)
         }
         console.log(id,sort,type)
         
          query(SQL.saveBanner,{ sort, type, id, path,title});
      } catch (error) {
        reject(error)
      }
      resolve();
    })
  

};
//获取banner
module.exports.getBanner =  () => query(SQL.getBanner);
module.exports.changeBanner  =  (val) => query(SQL.changeBanner,val );
module.exports.updateBanner  =  (val) => query(SQL.updateBanner,val );
module.exports.updateBannerAll  =  (val) => query(SQL.updateBannerAll,val );
module.exports.deleteBannerById =  (val) => query(SQL.deleteBannerById,val);
//增加链接
module.exports.addLink =  (val) => query(SQL.addLink,val);
//获取链接
module.exports.getLinkCatalog = () => query(SQL.getLinkCatalog);
module.exports.getLink =  (id) => query(SQL.getLink,id);
module.exports.editLink =  (name,link,id) => query(SQL.editLink,[name,link,id]);
//删除链接
module.exports.deleteLink = (id) => query(SQL.deleteLink,id);

//后台用户
module.exports.getUser = (account) => query(SQL.getUser,account);
module.exports.updateUser = (pass) => query(SQL.changePassword,pass);
module.exports.updateUserTime = (val) => query(SQL.updateUserTime,val);


//意见反馈
module.exports.saveFeedBack = (val) => query(SQL.saveFeedBack,val);
module.exports.getFeedBackCatalog = (start) => query(SQL.getFeedBackCatalog,start);
module.exports.setFeedBackRead = (id) => query(SQL.setFeedBackRead,id);
module.exports.deleteFeedBack = (id) => query(SQL.deleteFeedBack,id);
module.exports.getFeedBackOne  = (id) => {

  query(SQL.setFeedBackRead,id);
  return query(SQL.getFeedBackOne,id);
}

module.exports.getIntro = () => query(SQL.getIntro);
module.exports.updateIntro = (content) => query(SQL.updateIntro,content);


module.exports.getResearchdir = () => query(SQL.getResearchdir);
module.exports.updateResearchdir = (val) => query(SQL.updateResearchdir,val);
