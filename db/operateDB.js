const query = require("./db").query;
const sql = require("config-lite")(__dirname).sql;
module.exports = {
  getIndexCir: () => {
    return new Promise((resolve, reject) => {
      query(sql.getIndexCir, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  },
  getCirOne : id =>{
    return new Promise((resolve, reject) => {
      query(sql.getCirOne, id, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    })
  },
  saveAcademicPapers: Article => {
    return new Promise((resolve, reject) => {
      query(
        sql.saveAcademicPapers,
        {
          title: Article.title,
          author: Article.author,
          time: Article.time,
          content: Article.content,
          source: Article.source
        },
        function(err, result) {
          if (err) throw err;
          resolve();
        }
      );
    });
  },
  getCirculationNews: id => {
    return new Promise((resolve, reject) => {
      query();
    });
  },
  saveCirculationNews: Article => {
    return new Promise((resolve, reject) => {
      query(
        "INSERT INTO CirculationNews SET ?",
        {
          title: Article.title,
          author: Article.author,
          time: Article.time,
          content: Article.content,
          source: Article.source
        },
        function(err, result) {
          if (err) throw err;
          resolve();
        }
      );
    });
  }
};
