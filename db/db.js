const mysql = require("mysql");
const config = require("config-lite")(__dirname);


function handleError(err) {
  if (err) {
    // 如果是连接断开，自动重新连接
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      connect();
    } else {
      console.error(err.stack || err);
    }
  }
}

// 连接数据库
function connect() {
  db = mysql.createConnection(config.db);
  db.connect(handleError);
  db.on("error", handleError);
}

var db;
connect();
// let query = function(sql, options, callback) {
  
//   db.query(sql, options, function(err, results) {
//     callback(err, results);
//   });
// };

let query = function(sql, options) {
  
    return new Promise((resolve, reject) => {
      db.query(sql, options, function(err, results) {
        if(err){
          reject(err)
        }
        else resolve(results);
      });
    })
   
  };
module.exports = { query  };
