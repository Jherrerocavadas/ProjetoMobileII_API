import { Request, Response } from "express";
import { pool } from "../utils/connectionDB";

export async function userLogin(req: Request, res:Response) {
  try{

    console.log(req.query)
    const {login, senha} = req.query;

    pool.getConnection((err, connection) => {
      if(err) throw err
      console.log('connected as id ' + connection.threadId)
      connection.query('SELECT * from usuarios WHERE login = ? AND senha = ?',[login, senha], (err, rows) => {
          connection.release() // return the connection to pool
          if (!err) {
              res.send(rows)
          } else {
              console.log(err)
          }

          console.log(`Usuário: `, rows)
      })
  })
  } catch (error){
    console.log(error);
    res.status(500).send(error);
  }
}


export async function fatecCriar(req: Request, res:Response) {
  try{
    console.log("Criação de Fatec:")
    const {cod, obs} = req.body;

    pool.getConnection((err, connection) => {
      if(err) throw err
      console.log('connected as id ' + connection.threadId)
      connection.query('INSERT into fatecs (cod, obs) VALUES (?,?)',[cod, obs], (err, rows) => {
          connection.release() // return the connection to pool
          if (!err) {
              res.send(rows)
          } else {
              console.warn(err)
          }

          console.log(`Fatec alterada: `, rows)
      })
  })
  } catch (error){
    console.log(error);
    res.status(500).send(error);
  }
}

export async function prestadorCriar(req: Request, res:Response) {

}

export async function prestadoresFatecsCriar(req: Request, res:Response) {

}






export async function usuarioCriar(req: Request, res:Response) {
  try{
    console.log("CRIAÇÃO DE USUÁRIO:")

    const {login, senha, status, tipo} = req.body;

    pool.getConnection((err, connection) => {
      if(err) throw err
      console.log('connected as id ' + connection.threadId)
      connection.query('INSERT into usuarios (login, senha, status, tipo) VALUES (?,?,?,?)',[login, senha, status, tipo], (err, rows) => {
          connection.release() // return the connection to pool
          if (!err) {
              res.send(rows)
          } else {
              console.warn(err)
          }

          console.log(`Usuário criado: `, rows)
      })
  })
  } catch (error){
    console.log(error);
    res.status(500).send(error);
  }
}


export async function fatecUpdate(req: Request, res:Response) {
  try{
    console.log("Alteração de Fatec:")
    const id = req.params.id
    const {cod, obs} = req.body;

    pool.getConnection((err, connection) => {
      if(err) throw err
      console.log('connected as id ' + connection.threadId)
      connection.query('UPDATE fatecs SET cod = ?, obs = ? WHERE id = ?',[cod, obs, id], (err, rows) => {
          connection.release() // return the connection to pool
          if (!err) {
              res.send(rows)
          } else {
              console.warn(err)
          }

          console.log(`Fatec alterada: `, rows)
      })
  })
  } catch (error){
    console.log(error);
    res.status(500).send(error);
  }
}

export async function prestadorUpdate(req: Request, res:Response) {
  try{
    console.log("Alteração de Prestador:")
    const id = req.params.id
    const {nomePrestador, ramoAtuacao, empresa} = req.body;

    pool.getConnection((err, connection) => {
      if(err) throw err
      console.log('connected as id ' + connection.threadId)
      connection.query('UPDATE usuarios SET nomePrestador = ?, ramoAtuacao = ?, empresa = ? WHERE id = ?',[nomePrestador, ramoAtuacao, empresa, id], (err, rows) => {
          connection.release() // return the connection to pool
          if (!err) {
              res.send(rows)
          } else {
              console.warn(err)
          }

          console.log(`Prestador alterado: `, rows)
      })
  })
  } catch (error){
    console.log(error);
    res.status(500).send(error);
  }
}

export async function prestadoresFatecsUpdate(req: Request, res:Response) {
  try{
    console.log("Alteração de Prestadores Fatecs:")
    const id = req.params.id
    const {idPrestador, idF, obs} = req.body;

    pool.getConnection((err, connection) => {
      if(err) throw err
      console.log('connected as id ' + connection.threadId)
      connection.query('UPDATE usuarios SET idPrestador = ?, idF = ?, obs = ? WHERE id = ?',[idPrestador, idF, obs, id], (err, rows) => {
          connection.release() // return the connection to pool
          if (!err) {
              res.send(rows)
          } else {
              console.warn(err)
          }

          console.log(`Prestadores_Fatecs alterado: `, rows)
      })
  })
  } catch (error){
    console.log(error);
    res.status(500).send(error);
  }
}

export async function usuariosUpdate(req: Request, res:Response) {
  try{
    console.log("Alteração de Usuário:")
    const id = req.params.id
    const {login, senha, status, tipo} = req.body;

    pool.getConnection((err, connection) => {
      if(err) throw err
      console.log('connected as id ' + connection.threadId)
      connection.query('UPDATE usuarios SET login = ?, senha = ?, status = ?, tipo = ? WHERE id = ?',[login, senha, status, tipo, id], (err, rows) => {
          connection.release() // return the connection to pool
          if (!err) {
              res.send(rows)
          } else {
              console.warn(err)
          }

          console.log(`Usuário alterado: `, rows)
      })
  })
  } catch (error){
    console.log(error);
    res.status(500).send(error);
  }
}

/*

// função para query de dados de uma tabela
export function selectFromSQL(tabela: string, req:Request, res:Response) {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query(`SELECT * from ${tabela}`, (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            console.log(`Dados ${tabela}`, rows)
        })
    })
}


// função para query de dados de uma tabela com Where
export function selectWhereSQL(tabela: string, req:Request, res:Response) {
    const id = parseInt(req.params.id)
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query(`SELECT * from ${tabela} WHERE id=?`,[id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            console.log(`Consulta: id ${req.params.id}; Tabela: ${tabela}`, rows)
        })
    })
}

// função para deletar dados de uma tabela com base no id
export function deleteSQL(tabela: string, req:Request, res:Response) {
    const id = parseInt(req.params.id)
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query(`DELETE from ${tabela} WHERE id=?`,[id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            console.log(`Exclusão: id ${req.params.id}; Tabela: ${tabela}`, rows)
        })
    })
}

*/
