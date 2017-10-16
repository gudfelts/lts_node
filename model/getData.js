const SQL = require("config-lite")(__dirname).sql;
const TYPE = require("config-lite")(__dirname).type;
const operateDB = require("../db/operateDB");


module.exports.saveArticle = async (sort,val) => {
  let result = null;
  switch (sort) {
    case "information":
      await operateDB.saveArticle(SQL.saveInformation, val);
      break;
    case "achievement":
      await operateDB.saveArticle(SQL.saveResearch, val);
      break;
    case "research":
      await operateDB.saveArticle(SQL.saveAchievement, val);
      break;
    case "exchange":
      await operateDB.saveArticle(SQL.saveExchange, val);
      break;
    case "train":
      await operateDB.saveArticle(SQL.saveTrain, val);
      break;
    default:
     await operateDB.saveArticle(SQL.saveConstruction, val);
    
  }
  return {data : result};
};
module.exports.getArticleOne = async (sort,val) => {
  let result = null;
  switch (sort) {
    case "information":
      result = await operateDB.getArticle(SQL.getInfoOne, val);
      break;
    case "achievement":
      result = await operateDB.getArticle(SQL.getAchievementOne, val);
      break;
    case "research":
      result = await operateDB.getArticle(SQL.getResearchOne, val);
      break;
    case "exchange":
      result = await operateDB.getArticle(SQL.getExchangeOne, val);
      break;
    case "train":
      result = await operateDB.getArticle(SQL.getTrainOne, val);
      break;
    default:
      result = await operateDB.getArticle(SQL.getConstructionOne, val);    
      break;
  }
  return {data : result[0]};
};

module.exports.getArticle = async (sort, type, start ,end ) => {
  let data  = null;
 
  let title = TYPE[sort][type-1];

  switch (sort) {
    case "information":
      data = await operateDB.getArticle(SQL.getInfoAll, [type,start,end]);
      break;
    case "achievement":
      data = await operateDB.getArticle(SQL.getAchievementAll, [type,start,end]);
      
      break;
    case "research":
      data = await operateDB.getArticle(SQL.getResearchAll, [type,start,end]);
      
      break;
    case "exchange":
      data = await operateDB.getArticle(SQL.getExchangeAll, [type,start,end]);
     
      break;
    case "train":
      data = await operateDB.getArticle(SQL.getTrainAll, [type,start,end]);
     
      break;
    default:
      break;
  }
  return {data,title,sorts : TYPE[sort],sort};
};

module.exports.getIndex = async (sort, val) => {
  switch (sort) {
    case "information":
      result = await operateDB.getArticle(SQL.getIndexInfo, val);
      break;
    case "achievement":
      result = await operateDB.getArticle(SQL.getAchievementNum);
      break;
    case "research":
      result = await operateDB.getArticle(SQL.getResearchNum);
      break;
    case "exchange":
      result = await operateDB.getArticle(SQL.getExchangeNum);
      break;
    case "train":
      result = await operateDB.getArticle(SQL.getTrainNum);
      break;
    default:
      result = await operateDB.getArticle(SQL.getConstructionNum);    
      break;
  }
  return result;
};
module.exports.getNum = async sort => {

  switch (sort) {
    case "information":
      result = await operateDB.getNum(SQL.getInfoNum);
      break;
    case "achievement":
      result = await operateDB.getNum(SQL.getAchievementNum);
      break;
    case "research":
      result = await operateDB.getNum(SQL.getResearchNum);
      break;
    case "exchange":
      result = await operateDB.getNum(SQL.getExchangeNum);
      break;
    case "train":
      result = await operateDB.getNum(SQL.getTrainNum);
      break;
    default:
      result = await operateDB.getNum(SQL.getConstructionNum);    
      break;
  }
  return result[0]["count(1)"];
  
};
