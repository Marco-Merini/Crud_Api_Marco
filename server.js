import express from "express"
import cors from "cors"
import db from "./config/database.js"
import Router from "./routers/produtos_routes.js"

const server = express()
server.use(express.json())
server.use(cors())

try {
    await db.authenticate()
    console.log("Conexão com o MySQl estabelecida!")
} catch (e) {
    console.log("Conexão com o MySQL não estabelecida", e)
}

server.use(Router)
server.listen(3000, () => console.log("server executando em http://localhost:3000"))