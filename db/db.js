const mysql  = require('mysql');
const config = require('config-lite')(__dirname);
const pool   = mysql.createPool({
  connectionLimit : 10,
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'lts'
});

let query = function(sql,options){  
  pool.getConnection(function(err,conn){  
     
          conn.query(sql,options,function(err,results){  
             // And done with the connection.
            conn.release();
    
            // Handle error after the release.
            if (error) throw error;
             
          });  
      }) 

};  

module.exports ={ query }; 