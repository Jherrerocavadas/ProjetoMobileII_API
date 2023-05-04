import { Router } from "express";
import { pool } from "./connectionDB";
import { usuarioCriar,
   userLogin,
   usuariosUpdate,
   /*selectFromSQL, selectWhereSQL, deleteSQL,*/
   fatecUpdate,
   prestadorUpdate,
   prestadoresFatecsUpdate,
   fatecCriar,
   prestadorCriar,
   prestadoresFatecsCriar} from "../models/postComands";


export const router = Router();

//Rota home
router.get('/', (req, res) => res.json({ message: 'A conexão com o banco de dados (MySQL) está funcionando' }));

// rotas de seleção dos dados das tabelas
selectSQL('fatecs')
selectSQL('prestador')
selectSQL('prestadores_fatecs')
selectSQL('usuarios')

// rotas de seleção de uma linha pelo ID
selectById('fatecs')
selectById('prestador')
selectById('prestadores_fatecs')
selectById('usuarios')

// rotas de exclusão de uma linha pelo ID
deleteById('fatecs')
deleteById('prestador')
deleteById('prestadores_fatecs')
deleteById('usuarios')

// rotas de inserção de dados nas tabelas
insertInto('fatecs')
insertInto('prestador')
insertInto('prestadores_fatecs')
insertInto('usuarios')


// rotas de atualização de uma linha pelo ID
updateById('fatecs')
updateById('prestador')
updateById('prestadores_fatecs')
updateById('usuarios')

// rotas
router.get('/usuariosLogin', userLogin)


function insertInto(tabela: string) {
  switch (tabela) {
    case 'fatecs':
      router.post(`/${tabela}`, fatecCriar)
      break;

    case 'prestador':
      router.post(`/${tabela}`, prestadorCriar)
      break;

    case 'prestadores_fatecs':
      router.post(`/${tabela}`, prestadoresFatecsCriar)
      break;

    case 'usuarios':
      router.post(`/${tabela}`, usuarioCriar)
      break;

    default:
      break;
  }

}

function updateById(tabela: string) {
  switch (tabela) {
    case 'fatecs':
      router.put(`/${tabela}/:id`, fatecUpdate)
      break;

    case 'prestador':
      router.put(`/${tabela}/:id`, prestadorUpdate)
      break;

    case 'prestadores_fatecs':
      router.put(`/${tabela}/:id`, prestadoresFatecsUpdate)
      break;

    case 'usuarios':
      router.put(`/${tabela}/:id`, usuariosUpdate)
      break;

    default:
      break;
  }

}
//router.post('/usuario', usuarioCriar)
//router.put('/usuarios/:id', usuariosUpdate)

// function selectSQL(tabela: string) {
//   router.get(`/${tabela}`, selectFromSQL)}

// function selectById(tabela: string) {
//   router.get(`/${tabela}/:id`, selectWhereSQL)
// }
// function deleteById(tabela: string) {
//   router.delete(`/${tabela}/:id`, deleteSQL)
// }

// função para query de dados de uma tabela
function selectSQL(tabela: string) {
  router.get(`/${tabela}`, (req, res) => {
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
})
}


// função para query de dados de uma tabela com Where
function selectById(tabela: string) {
  router.get(`/${tabela}/:id`, (req, res) => {
    const id = parseInt(req.params.id)
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query(`SELECT * from ${tabela} WHERE id=?`,[id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(rows)
            } else {


                res.send({"erro":err})
            }

            console.log(`Consulta: id ${req.params.id}; Tabela: ${tabela}`, rows)
        })
    })
})
}

// função para query de dados de uma tabela com Where
function deleteById(tabela: string) {
  router.delete(`/${tabela}/:id`, (req, res) => {
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
})
}

/*
// função para query de dados de uma tabela com Where
function updateById(tabela: string) {
  router.get(`/${tabela}/:id`, (req, res) => {
    const id = parseInt(req.params.id)
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query(`update * from ${tabela} WHERE id=?`,[id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            console.log(`Consulta: id ${req.params.id}; Tabela: ${tabela}`, rows)
        })
    })
})
}
*/

