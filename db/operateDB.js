const query = require("./db").query;
const SQL   = require('config-lite')(__dirname).sql;

module.exports = {

  //获取用户
  getUser: val => {
    return new Promise((resolve, reject) => {
     
      query(SQL.getUser, val,(err, result) => {
        if (err) throw err;
        resolve(result[0]);

      });
    });
  },
  //更新用户信息
  updateUser : val =>{
    return new Promise((resolve, reject) => {
      query(SQL.changePassword, val, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  },
  
  getIndex : (sql,val)=>{
    return new Promise((resolve, reject) => {
      query(sql, val, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  },
  getCatalog : val =>{
    return new Promise((resolve, reject) => {
      query(SQL.getCatalog, val, (err, result) => {
        console.log()
        if (err) throw err;
        resolve(result);
      });
    })
  },
  //获取文章
  getArticleOne : val =>{
    return new Promise((resolve, reject) => {
      query(SQL.getArticleOne, val, (err, result) => {
        console.log()
        if (err) throw err;
        resolve(result);
      });
    })
  },

  //存储文章
  saveArticle: (Article) => {
    return new Promise((resolve, reject) => {
      query(
        SQL.saveArticle,
        Article,
        function(err, result) {
          if (err) throw err;
          resolve();
        }
      );
    });
  },
  
   //删除文章
   deleteArticle: (val) => {
    return new Promise((resolve, reject) => {
      query(
        SQL.deleteArticle,
        val,
        function(err, result) {
          if (err) throw err;
          resolve();
        }
      );
    });
  },
  getNum : (val)=>{
    return new Promise((resolve, reject) => {
      query(SQL.getNum, val, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    })
  },

  addBrowse : (val)=>{
    return new Promise((resolve, reject) => {
      query(SQL.addBrowse, val, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    })
  },

  addPraise : (val)=>{
    return new Promise((resolve, reject) => {
      query(SQL.praise, val, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    })
  },

  getTeam : (val)=>{
    return new Promise((resolve, reject) => {
      query(SQL.getTeam, val, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    })
  },

  getTeamOne : (val)=>{
    return new Promise((resolve, reject) => {
      query(SQL.getTeamOne, val, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    })
  },

  updateTeamOne : (val)=>{
    return new Promise((resolve, reject) => {
      query(SQL.updateTeamOne, val, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    })
  }
};
