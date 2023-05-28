const mysql = require('mysql2');

const con = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: 'password',
  database: 'autoPark'
});

exports.execSQLQuery = ((sqlQry) => {
  return new Promise((resolve, reject) => {
    con.query(sqlQry, (error, results) => {
      if(error) {
        reject(error);
        con.end();
      }
      else {
        resolve(results);
      }
    });  
  });
  
})