const mysql  = require('mysql');
const config = require('config-lite')(__dirname);
const pool   = mysql.createPool({
  connectionLimit : 10,
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'lts'
});

let query = function(sql,options,callback){  
  pool.getConnection(function(err,conn){  
      if(err){  
          callback(err,null,null);  
      }else{  
          conn.query(sql,options,function(err,results){  
              //释放连接 
  
            //   conn.release();
              conn.end()  
              //事件驱动回调  
              callback(err,results);  
          });  
      }  
  }); 
};  

module.exports ={ query }; 