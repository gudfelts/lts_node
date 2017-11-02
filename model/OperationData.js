const SQL = require("../config/sql");
const TYPE = require("config-lite")(__dirname).type;
const operateDB = require("../db/operateDB");

//储存文章
module.exports.saveArticle = (sort, val) => operateDB.saveArticle([sort, val]);
module.exports.editArticle = (
  sort,
  title,
  author,
  source,
  time,
  content,
  id,
  type
) =>
  operateDB.editArticle([sort, title, author, source, time, content, id, type]);

//删除文章
module.exports.deleteArticle = (sort, id, type) =>
  operateDB.deleteArticle([sort, id, type]);

//获取单个文章
module.exports.getArticleOne = (sort, id, type) =>
  operateDB.getArticleOne([sort, id, type]);
//搜索文章
module.exports.searchArticle = (sort, title, type, start) =>
  operateDB.searchArticle([sort, title, type, start]);

module.exports.reacherPerson = (name, start) =>
  operateDB.reacherPerson([name, start]);

//搜索类，获取全部结果的条数
module.exports.getSearchNum = async (kind, sort, title, type) => {
  let result = null;
  switch (kind) {
    case "article":
      result = await operateDB.getSearchNum(SQL.getReacherNumArticle, [
        sort,
        title,
        type
      ]);
      break;
    case "person":
      result = await operateDB.getSearchNum(SQL.getReacherNumPerson, [sort]);
      break;
  }
 
  return result[0]["count(1)"];
};
//获取目录
module.exports.getCatalog = async (sort, type, start) => {
  
  if(sort == 'researchdir'){
    let data = await operateDB.getCatalog([sort, type, start]).catch(e => {
      throw e;
    });
    return { data, code: 200,sort :'researchdir',type : 0};
  }
  else{
    let title = TYPE[sort][type - 1];
    
      let data = await operateDB.getCatalog([sort, type, start]).catch(e => {
        throw e;
      });
    
      return { data, title, sorts: TYPE[sort], sort, code: 200 };
  }
 
};


//首页获取数据
module.exports.getIndex = (sort, val) => {
  switch (sort) {
    case "information":
      return operateDB.getIndex(SQL.getIndexInfo, val);
      break;
    case "research":
      return operateDB.getIndex(SQL.getIndexResearch, val);
      break;
    case "exchange":
      return operateDB.getIndex(SQL.getIndexExchange, val);
      break;
    case "train":
      return operateDB.getIndex(SQL.getIndexTrain, val);
      break;
    case "construction":
      return operateDB.getIndex(SQL.getIndexConstruction, val);
      break;
  }
};

module.exports.getAllNum = async (sort) => {
 
    result = await operateDB.getNum(SQL.getAllNum,sort);
  
  return result[0]["count(1)"];
};
//获取表格条数
module.exports.getNum = async (sort,type) => {
  let result = null;
  if(sort === 'team'){
      result = await operateDB.getNum(SQL.getNumNoTYPE,sort);
  }
  else{
      result = await operateDB.getNum(SQL.getNum,[sort,type]);
  }


  return result[0]["count(1)"];
};

//点赞
module.exports.addPraise = async (sort, id) => {
  result = await operateDB.addPraise([sort, id]);
};

//增加浏览数
module.exports.addBrowse = (sort, id, type) => {
  operateDB.addBrowse([sort, id, type]);
};

//获取近期热门文章
module.exports.getHotArticle = async sort => {
  let result = null;
  result = await operateDB.getHotArticle(sort);
  return result.splice(15);
};
//专家团队
module.exports.getTeam = start => operateDB.getTeam(start);
module.exports.saveTeam = value => operateDB.saveTeam(value);
module.exports.getPerson = id => operateDB.getPerson(id);
module.exports.getTeamoOther = id => operateDB.getTeamoOther(id);
module.exports.deletePerson = id => operateDB.deletePerson(id);
module.exports.updatePerson = (id, name, content, position, avatar,summary) =>operateDB.updatePerson([name, position, content, avatar,summary, id]);

//存放banner
module.exports.saveBanner = (sort, type, id, path) => {
  try {
    // operateDB.deleteBanner();
    operateDB.saveBanner({ sort, type, id, path });
  } catch (error) {
    throw e;
  }
};
//存放banner
module.exports.getBanner =  () => operateDB.getBanner();
//增加链接
module.exports.addLink =  (val) => operateDB.addLink(val);
//获取链接
module.exports.getLinkCatalog = () => operateDB.getLinkCatalog();
module.exports.getLink =  (id) => operateDB.getLink(id);
module.exports.editLink =  (name,link,id) => operateDB.editLink([name,link,id]);
//删除链接
module.exports.deleteLink = (id) => operateDB.deleteLink(id);
