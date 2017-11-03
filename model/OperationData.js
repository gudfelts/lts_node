const SQL = require("../config/sql");
const TYPE = require("config-lite")(__dirname).type;
const queryTest = require("../db/db").queryTest;

//储存文章
module.exports.saveArticle = (sort, val) => queryTest(SQL.saveArticle,[sort, val]);
//修改文章
module.exports.editArticle = (val) =>queryTest(sql.editArticle,val);

//删除文章
module.exports.deleteArticle = (sort, id, type) => queryTest(SQL.deleteArticle,[sort, id, type]);

//获取单个文章
module.exports.getArticleOne = (sort, id, type) => queryTest(SQL.getArticleOne,[sort, id, type])
//搜索文章
module.exports.searchArticle = (sort, title, type, start) => queryTest(SQL.searchArticle,[sort, title, type, start]);

module.exports.reacherPerson = (name, start) => queryTest(SQL.reacherPerson,[name, start]);

//搜索类，获取全部结果的条数
module.exports.getSearchNum = async (kind, sort, title, type) => {
  let result = null;
  switch (kind) {
    case "article":
      result = await queryTest(SQL.getReacherNumArticle, [
        sort,
        title,
        type
      ]);
      break;
    case "person":
      result = await queryTest(SQL.getReacherNumPerson, [sort]);
      break;
  }
 
  return result[0]["count(1)"];
};
//获取目录
module.exports.getCatalog = async (sort, type, start) => {
  
  if(sort == 'researchdir'){
    let data = await queryTest(SQL.getCatalog,[sort, type, start]).catch(e => {
      throw e;
    });
    return { data, code: 200,sort :'researchdir',type : 0};
  }
  else{
    let title = TYPE[sort][type - 1];
    
      let data = await queryTest(SQL.getCatalog,[sort, type, start]).catch(e => {
        throw e;
      });
    
      return { data, title, sorts: TYPE[sort], sort, code: 200 };
  }
 
};
//获取近期热门文章
module.exports.getHotArticle = async sort => {
  let result = await queryTest(SQL.getHotArticle,sort);
  return result.splice(15);
};

//首页获取数据
module.exports.getIndex = (sort, val) => {
  switch (sort) {
    case "information":
      return queryTest(SQL.getIndexInfo, val);
      break;
    case "research":
      return queryTest(SQL.getIndexResearch, val);
      break;
    case "exchange":
      return queryTest(SQL.getIndexExchange, val);
      break;
    case "train":
      return queryTest(SQL.getIndexTrain, val);
      break;
    case "construction":
      return queryTest(SQL.getIndexConstruction, val);
      break;
  }
};

module.exports.getAllNum = async (sort) => {
 
    result = await queryTest(SQL.getAllNum,sort);
  
  return result[0]["count(1)"];
};
//获取表格条数
module.exports.getNum = async (sort,type) => {
  let result = null;
  if(sort === 'team'){
      result = await queryTest(SQL.getNumNoTYPE,sort);
  }
  else{
      result = await queryTest(SQL.getNum,[sort,type]);
  }


  return result[0]["count(1)"];
};

//点赞
module.exports.addPraise = async (sort, id) => {
  result = await queryTest(SQL.addPraise,[sort, id]);
};

//增加浏览数
module.exports.addBrowse = (sort, id, type) => queryTest(SQL.addBrowse,[sort, id, type]);





//专家团队
module.exports.getTeam = start => queryTest(SQL.getTeam,start);
module.exports.saveTeam = value => queryTest(SQL.saveTeam,value);
module.exports.getPerson = id => queryTest(SQL.getPerson,id);
module.exports.getTeamoOther = id => queryTest(SQL.getTeamoOther,id);
module.exports.deletePerson = id => queryTest(SQL.deletePerson,id);
module.exports.updatePerson = (id, name, content, position, avatar,summary) =>queryTest(SQL.updatePerson,[name, position, content, avatar,summary, id]);

//存放banner
module.exports.saveBanner = (sort, type, id, path) => {
  try {
    SQL.deleteBanner();
    queryTest(SQL.saveBanner,{ sort, type, id, path });
  } catch (error) {
    throw e;
  }
};
//存放banner
module.exports.getBanner =  () => queryTest(SQL.getBanner);
//增加链接
module.exports.addLink =  (val) => queryTest(SQL.addLink,val);
//获取链接
module.exports.getLinkCatalog = () => queryTest(SQL.getLinkCatalog);
module.exports.getLink =  (id) => queryTest(SQL.getLink,id);
module.exports.editLink =  (name,link,id) => queryTest(SQL.editLink,[name,link,id]);
//删除链接
module.exports.deleteLink = (id) => queryTest(SQL.deleteLink,id);

//后台用户
module.exports.getUser = (account) => queryTest(SQL.getUser,account);
module.exports.updateUser = (pass) => queryTest(SQL.changePassword,pass);
module.exports.updateUserTime = (pass) => queryTest(SQL.changePassword,pass);

