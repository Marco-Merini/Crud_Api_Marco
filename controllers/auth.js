require("dotenv-safe").config()
const jwt = require('jsonwebtoken')

const http = require('http')
const express = require('express')
const app =  express() 

const bodyParser =  require('body-parser')
const { json } = require("body-parser")
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({message:"Servidor base '/' funcionando"})
})

app.get('/exemplo', verifyToken, (req, res) => {
    console.log("Retorno do exemplo 'mockado' funcionando...")
    res.json({id:1,nome:'camargo'})

})

app.post('/login', (req, res) => {
    if ((req.body.user === 'camargo') && (req.body.pwd === '123')) {
        const id =  1
        const token = jwt.sign({id}, process.env.SECRET, {
        expiresIn: 300
        })
        return res.json({auth:true, token: token})
    }
    res.status(500).json({message:"Login Inválido"})
})

function verifyToken(req, res, next) {
    const token = req.headers['x-access-token']
    if (!token) return res.status(401).json({auth:false, message: "Não há token"})

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) return res.status(500).json({auth: false, message: "Erro com a autenticação do Token"})

    req.userId = decoded.id
    next()    
    })

}

const server = http.createServer(app)
server.listen(3000)
console.log("Servidor em execução na porta 3000")