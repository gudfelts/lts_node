const query = require("./db").query;
const SQL = require("config-lite")(__dirname).sql;

module.exports = {
  //获取用户
  getUser: val => {
    return new Promise((resolve, reject) => {
      query(SQL.getUser, val, (err, result) => {
        if (err) {
          throw err;
          reject({ message: err, status: 404 });
        } else resolve(result[0]);
      });
    });
  },
  //更新用户信息
  updateUser: val => {
    return new Promise((resolve, reject) => {
      query(SQL.changePassword, val, (err, result) => {
        if (err) {
          throw err;
          reject({ message: err, status: 404 });
        } else resolve(result);
      });
    });
  },

  getIndex: (sql, val) => {
    return new Promise((resolve, reject) => {
      query(sql, val, (err, result) => {
        if (err) {
          throw err;
          reject({ message: err, status: 404 });
        } else resolve(result);
      });
    });
  },
  getCatalog: val => {
    return new Promise((resolve, reject) => {
      query(SQL.getCatalog, val, (err, result) => {
        if (err) reject({ message: err, status: 500 });
        else resolve(result);
      });
    });
  },

  //获取文章
  getArticleOne: val => {
    return new Promise((resolve, reject) => {
      query(SQL.getArticleOne, val, (err, result) => {
        if (err) {
          throw err;
          reject({ message: err, status: 500 });
        }
        else resolve(result[0]);
      });
    });
  },

  //存储文章
  saveArticle: Article => {
    return new Promise((resolve, reject) => {
      query(SQL.saveArticle, Article, function(err, result) {
        if (err) {
          {
            throw err;
            reject({ message: err, status: 404 });
          }
        } else resolve(result.insertId);
      });
    });
  },
  //修改文章
  editArticle: Article => {
    return new Promise((resolve, reject) => {
      query(SQL.editArticle, Article, function(err, result) {
        if (err) {
          throw err;
          reject({ message: err, status: 404 });
        } else resolve(result.insertId);
      });
    });
  },
  searchArticle: val => {
    console.log(val);
    return new Promise((resolve, reject) => {
      query(SQL.searchArticle, val, function(err, result) {
        if (err) {
          console.log(err);
          {
            throw err;
            reject({ message: err, status: 404 });
          }
        } else resolve(result);
      });
    });
  },
  reacherPerson: val => {
    return new Promise((resolve, reject) => {
      query(SQL.reacherPerson, val, function(err, result) {
        if (err) {
          console.log(err);
          {
            throw err;
            reject({ message: err, status: 404 });
          }
        } else resolve(result);
      });
    });
  },
  getSearchNum: (sql, val) => {
    return new Promise((resolve, reject) => {
      query(sql, val, function(err, result) {
        if (err) {
          console.log(err);
          
            throw err;
            reject({ message: err, status: 404 });
          
        } else resolve(result);
      });
    });
  },
  //删除文章
  deleteArticle: val => {
    return new Promise((resolve, reject) => {
      query(SQL.deleteArticle, val, function(err, result) {
        if (err) {
          throw err;
          reject({ message: err, status: 404 });
        } else resolve();
      });
    });
  },

  //删除人物
  deletePerson: val => {
    return new Promise((resolve, reject) => {
      query(SQL.deletePerson, val, function(err, result) {
        if (err) {
          throw err;
          reject({ message: err, status: 404 });
        } else resolve();
      });
    });
  },
  getNum: (sql, val) => {
    return new Promise((resolve, reject) => {
      query(sql, val, (err, result) => {
        if (err) {
          console.log(err);
          
            throw err;
            reject({ message: err, status: 404 });
          
        } else resolve(result);
      });
    });
  },

  addBrowse: val => {
    return new Promise((resolve, reject) => {
      query(SQL.addBrowse, val, (err, result) => {
        if (err) {
          throw err;
          reject({ message: err, status: 404 });
        } else resolve(result);
      });
    });
  },

  addPraise: val => {
    return new Promise((resolve, reject) => {
      query(SQL.praise, val, (err, result) => {
        if (err) {
          throw err;
          reject({ message: err, status: 404 });
        } else resolve(result);
      });
    });
  },

  saveTeam: val => {
    return new Promise((resolve, reject) => {
      query(SQL.saveTeam, val, (err, result) => {
        if (err) {
          throw err;
          reject({ message: err, status: 404 });
        } else resolve(result);
      });
    });
  },
  getTeam: val => {
    return new Promise((resolve, reject) => {
      query(SQL.getTeam, val, (err, result) => {
        if (err) {
          throw err;
          reject({ message: err, status: 404 });
        } else resolve({ person: result });
      });
    });
  },

  getPerson: val => {
    return new Promise((resolve, reject) => {
      query(SQL.getPerson, val, (err, result) => {
        if (err) {
          throw err;
          reject({ message: err, status: 404 });
        } else resolve(result);
      });
    });
  },
  getTeamoOther: val => {
    return new Promise((resolve, reject) => {
      query(SQL.getTeamoOther, val, (err, result) => {
        if (err) {
          throw err;
          reject({ message: err, status: 404 });
        } else resolve(result);
      });
    });
  },
  updatePerson: val => {
    return new Promise((resolve, reject) => {
      query(SQL.updatePerson, val, (err, result) => {
        if (err) {
          throw err;
          
            reject({ message: err, status: 404 });
          
        } else resolve(result);
      });
    });
  },

  getHotArticle: val => {
    return new Promise((resolve, reject) => {
      query(SQL.getHotArticle, val, (err, result) => {
        if (err) {
          throw err;
          reject({ message: err, status: 404 });
        } else resolve(result);
      });
    });
  },
  getBanner: () => {
    return new Promise((resolve, reject) => {
      query(SQL.getBanner, (err, result) => {
        if (err) {
          throw err;
          reject({ message: err, status: 404 });
        } else resolve(result);
      });
    });
  },

  saveBanner: val => {
    return new Promise((resolve, reject) => {
      query(SQL.saveBanner, val, (err, result) => {
        if (err) {
          throw err;
          reject({ message: err, status: 404 });
        } else resolve(result);
      });
    });
  },
  deleteBanner: () => {
    return new Promise((resolve, reject) => {
      query(SQL.deleteBanner, (err, result) => {
        if (err) {
          throw err;
          reject({ message: err, status: 404 });
        } else resolve(result);
      });
    });
  },

  addLink:(val)=>{
    return new Promise((resolve, reject) => {
      query(SQL.addLink, val,(err, result) => {
        if (err) {
          throw err;
          reject({ message: err, status: 404 });
        } else resolve(result);
      });
    });
  },
  deleteLink:(val)=>{
    return new Promise((resolve, reject) => {
      query(SQL.deleteLink, val,(err, result) => {
        if (err) {
          throw err;
          reject({ message: err, status: 404 });
        } else resolve(result);
      });
    });
  },
  getLinkCatalog:()=>{
    return new Promise((resolve, reject) => {
      query(SQL.getLinkCatalog, (err, result) => {
        if (err) {
          throw err;
          reject({ message: err, status: 404 });
        } else resolve(result);
      });
    });
  },
  getLink:(id)=>{
    return new Promise((resolve, reject) => {
      query(SQL.getLink,id, (err, result) => {
        if (err) {
          reject({ message: err, status: 404 });
        } else resolve(result);
      });
    });
  },
  editLink:(val)=>{
    return new Promise((resolve, reject) => {
      query(SQL.editLink, val, (err, result) => {
        if (err) {
          reject({ message: err, status: 404 });
        } else resolve(result);
      });
    });
  },
};
