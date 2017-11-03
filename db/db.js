const mysql = require("mysql");
const config = require("config-lite")(__dirname);
// const pool   = mysql.createPool({
//   connectionLimit : 100,
//   host     : 'localhost',
//   user     : 'root',
//   password : 'root',
//   database : 'lts'
// });

// let query = function(sql,options,callback){
//   pool.getConnection(function(err,conn){
//       if(err){
//           callback(err,null,null);
//       }else{
//           conn.query(sql,options,function(err,results){
//               //释放连接

//               // conn.release();
//               conn.end();
//               if(err) throw err;
//               //事件驱动回调
//               callback(err,results);
//           });
//       }
//   });
// };

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
  db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "lts"
  });
  db.connect(handleError);
  db.on("error", handleError);
}

var db;
connect();
let query = function(sql, options, callback) {
  
  db.query(sql, options, function(err, results) {
    callback(err, results);
  });
};

let queryTest = function(sql, options) {
  
    return new Promise((resolve, reject) => {
      db.query(sql, options, function(err, results) {
        if(err) reject(err)
        else resolve(results);
      });
    })
   
  };
module.exports = { query,queryTest  };
