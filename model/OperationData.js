const SQL = require("config-lite")(__dirname).sql;
const TYPE = require("config-lite")(__dirname).type;
const operateDB = require("../db/operateDB");

//储存文章
module.exports.saveArticle = async (sort, val) => {
  switch (sort) {
    case "information":
      await operateDB.saveArticle([sort, val]);
      break;
    case "achievement":
      await operateDB.saveArticle([sort, val]);
      break;
    case "research":
      await operateDB.saveArticle([sort, val]);
      break;
    case "exchange":
      await operateDB.saveArticle([sort, val]);
      break;
    case "train":
      await operateDB.saveArticle([sort, val]);
      break;
    default:
      await operateDB.saveArticle([sort, val]);
  }
};

//删除文章
module.exports.deleteArticle = async (sort, id, type) => {
  switch (sort) {
    case "information":
      await operateDB.deleteArticle([sort, id, type]);
      break;
    case "achievement":
      await operateDB.deleteArticle([sort, id, type]);
      break;
    case "research":
      await operateDB.deleteArticle([sort, id, type]);
      break;
    case "exchange":
      await operateDB.deleteArticle([sort, id, type]);
      break;
    case "train":
      await operateDB.deleteArticle([sort, id, type]);
      break;
    default:
      await operateDB.deleteArticle([sort, id, type]);
  }
};

//获取单个文章
module.exports.getArticleOne = async (sort, id, type) => {
  let result = null;
  switch (sort) {
    case "information":
      result = await operateDB.getArticleOne([sort, id, type]);
      break;
    case "achievement":
      result = await operateDB.getArticleOne([sort, id, type]);
      break;
    case "research":
      result = await operateDB.getArticleOne([sort, id, type]);
      break;
    case "exchange":
      result = await operateDB.getArticleOne([sort, id, type]);
      break;
    case "train":
      result = await operateDB.getArticleOne([sort, id, type]);
      break;
    default:
      result = await operateDB.getArticleOne([sort, id, type]);
      break;
  }
  return { data: result[0] ,sort};
};

//获取目录
module.exports.getCatalog = async (sort, type, start) => {
  let data = null;

  let title = TYPE[sort][type - 1];

  switch (sort) {
    case "information":
      data = await operateDB.getCatalog([sort, type, start]);
      break;
    case "achievement":
      data = await operateDB.getCatalog([sort, type, start]);
      break;
    case "research":
      data = await operateDB.getCatalog([sort, type, start]);
      break;
    case "exchange":
      data = await operateDB.getCatalog([sort, type, start]);
      break;
    case "train":
      data = await operateDB.getCatalog([sort, type, start]);
      break;
    default:
      data = await operateDB.getCatalog([sort, type, start]);
      break;
  }
  return { data, title, sorts: TYPE[sort], sort };
};

//首页获取数据
module.exports.getIndex = async (sort, val) => {
  switch (sort) {
    case "information":
      result = await operateDB.getIndex(SQL.getIndexInfo, val);
      break;
    case "research":
      result = await operateDB.getIndex(SQL.getIndexResearch, val);
      break;
    case "exchange":
      result = await operateDB.getIndex(SQL.getIndexExchange, val);
      break;construction
    case "train":
      result = await operateDB.getIndex(SQL.getIndexTrain, val);  
      break;
    case "construction":
      result = await operateDB.getIndex(SQL.getIndexConstruction, val);  
      break;
  }
  return result;
};

//获取表格条数
module.exports.getNum = async sort => {
  switch (sort) {
    case "information":
      result = await operateDB.getNum(sort);
      break;
    case "achievement":
      result = await operateDB.getNum(sort);
      break;
    case "research":
      result = await operateDB.getNum(sort);
      break;
    case "exchange":
      result = await operateDB.getNum(sort);
      break;
    case "train":
      result = await operateDB.getNum(sort);
      break;
    case "team":
      result = await operateDB.getNum(sort);
      break;
    default:
      result = await operateDB.getNum(sort);
      break;
  }
  return result[0]["count(1)"];
};

//点赞
module.exports.addPraise = async (sort, id)=>{
  switch (sort) {
    case "information":
      result = await operateDB.addPraise([sort, id]);
      break;
    case "achievement":
      result = await operateDB.addPraise([sort, id]);
      break;
    case "research":
      result = await operateDB.addPraise([sort, id]);
      break;
    case "exchange":
      result = await operateDB.addPraise([sort, id]);
      break;
    case "train":
      result = await operateDB.addPraise([sort, id]);
      break;
    default:
      result = await operateDB.addPraise([sort, id]);
      break;
  }

}

//增加浏览数
module.exports.addBrowse = async (sort, id, type) => {
  switch (sort) {
    case "information":
      await operateDB.addBrowse([sort, id, type]);
      break;
    case "achievement":
      await operateDB.addBrowse([sort, id, type]);
      break;
    case "research":
      await operateDB.addBrowse([sort, id, type]);
      break;
    case "exchange":
      await operateDB.addBrowse([sort, id, type]);
      break;
    case "train":
      await operateDB.addBrowse([sort, id, type]);
      break;
    default:
      await operateDB.addBrowse([sort, id, type]);
  }
};

//获取近期热门文章
module.exports.getHotArticle = async sort => {

  let result = null;
  switch (sort) {
    case "information":
      result = await operateDB.getHotArticle(sort);
      break;
    case "achievement":
      result = await operateDB.getHotArticle(sort);
      break;
    case "research":
      result = await operateDB.getHotArticle(sort);
      break;
    case "exchange":
      result = await operateDB.getHotArticle(sort);
      break;
    case "train":
      result = await operateDB.getHotArticle(sort);
      break;
    default:
      result = await operateDB.getHotArticle(sort);
      break;
  }
  return result.splice(15);
};
//专家团队
module.exports.getTeam = async (start) =>  operateDB.getTeam(start);
module.exports.getTeamOne = async (id) =>  operateDB.getTeamOne(id);
module.exports.updateTeamOne = async (id,name,content,position,sex) =>  operateDB.getTeamOne([name,position,content,sex,id]);
