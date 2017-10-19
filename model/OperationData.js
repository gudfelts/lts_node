const SQL = require("config-lite")(__dirname).sql;
const TYPE = require("config-lite")(__dirname).type;
const operateDB = require("../db/operateDB");

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
      break;
  }
  return result;
};
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
    default:
      result = await operateDB.getNum(sort);
      break;
  }
  return result[0]["count(1)"];
};
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
