const sql       = require('config-lite')(__dirname).sql;
const operateDB = require('../db/operateDB');

module.exports.saveInformation = (article)=>{
    operateDB.saveArticle(sql.saveInformation, article);
}

module.exports.saveResearch = (article)=>{
    operateDB.saveArticle(sql.saveResearch, article);
}

module.exports.saveAchievement = (article)=>{
    operateDB.saveArticle(sql.saveAchievement, article);
}

module.exports.saveExchange = (article)=>{
    operateDB.saveArticle(sql.saveExchange, article);
}

module.exports.saveTrain = (article)=>{
    operateDB.saveTrain(sql.saveTrain, article);
}

module.exports.getInfoOne = async (id)=>{
    const result = await operateDB.getArticle(sql.getInfoOne, id);
    return result;
}

module.exports.getAchievementOne = async (id)=>{
    const result = await operateDB.getArticle(sql.getAchievementOne, id);
    return result;
}

module.exports.getResOne = async (id)=>{
    const result = await operateDB.getArticle(sql.getResOne, id);
    return result;
}

module.exports.getExcOne = async (id)=>{
    const result = await operateDB.getArticle(sql.getExcOne, id);
    return result;
}
module.exports.getIndex = async (sql,val)=>{
   
    const result = await operateDB.getArticle(sql,val);
    return result;
}
module.exports.getNum = async (sql)=>{
    
    const result = await operateDB.getNum(sql);
    return result[0]["count(1)"];
}
