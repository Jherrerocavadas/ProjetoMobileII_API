import mysql from 'mysql'
 // Configurando a nossa conexão com um banco de dados//

 export const serverName = "localhost";    //caminho do servidor do BD
 export const mydatabase ="dm20231n";        //nome do seu banco de dados
 export const username = "root";        //nome de um usuário de seu BD
 export const password = "";      //sua senha de acesso
 export const port = 3000; // número da porta para acesso da API

 export const pool = mysql.createPool({
    connectionLimit : 10,
    host     : serverName,
    user     : username,
    password : password,
    database : mydatabase
  });
