const mysql = require('mysql2');

const con = mysql.createConnection({
  host: 'localhost', // O host do banco. Ex: localhost
  user: 'root', // Um usuário do banco. Ex: user 
  password: 'password', // A senha do usuário. Ex: user123
  database: 'autoPark' // A base de dados a qual a aplicação irá se conectar, deve ser a mesma onde foi executado o Código 1. Ex: node_mysql
});

exports.execSQLQuery = ((sqlQry) => {
  return new Promise((resolve, reject) => {
    con.query(sqlQry, (error, results) => {
      if(error) {
        reject(error);
        con.end();
      }
      else {
        console.log(sqlQry)
        resolve(results);
      }
    });  
  });
  
})