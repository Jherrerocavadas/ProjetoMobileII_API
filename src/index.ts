import express from "express";
import { router } from './utils/routes'
import { port } from './utils/connectionDB';



const app = express();
app.use(express.json())

app.use(router)

// Iniciando o servidor.
app.listen(port, () => {
 console.log(`Os resultados das tabelas estão disponíveis em http://localhost:${port}/<Nome da Tabela>.`);
});
