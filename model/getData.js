const SQL = require("config-lite")(__dirname).sql;
const TYPE = require("config-lite")(__dirname).type;
const operateDB = require("../db/operateDB");

module.exports.saveArticle = async (sort, val) => {
  let result = null;
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
  return { data: result };
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
module.exports.praise = async (sort, id)=>{
  switch (sort) {
    case "information":
      result = await operateDB.praise(sort, id);
      break;
    case "achievement":
      result = await operateDB.praise(sort, id);
      break;
    case "research":
      result = await operateDB.praise(sort, id);
      break;
    case "exchange":
      result = await operateDB.praise(sort, id);
      break;
    case "train":
      result = await operateDB.praise(sort, id);
      break;
    default:
      result = await operateDB.praise(sort, id);
      break;
  }

}
