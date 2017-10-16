const query = require("./db").query;
const sql   = require('config-lite')(__dirname).sql;

module.exports = {

  //获取用户
  getUser: val => {
    return new Promise((resolve, reject) => {
     
      query(sql.getUser, val,(err, result) => {
        if (err) throw err;
        resolve(result[0]);

      });
    });
  },
  //更新用户信息
  updateUser : val =>{
    return new Promise((resolve, reject) => {
      query(sql.changePassword, val, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  },
  


  //获取文章
  getArticle : (sql, val) =>{
    return new Promise((resolve, reject) => {
      query(sql, val, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    })
  },

  //存储文章
  saveArticle: (sql,Article) => {
    return new Promise((resolve, reject) => {
      query(
        sql,
        // {
        //   title : Article.title,
        //   time  : Article.time,
        //   content : Article.content,
        //   source : Article.source,
        //   praise : Article.praise,
        //   type :Article.type
        // },
        Article,
        function(err, result) {
          if (err) throw err;
          resolve();
        }
      );
    });
  },
  
  getNum : (sql)=>{
    return new Promise((resolve, reject) => {
      query(sql,  (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    })
  }
};
