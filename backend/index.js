const app = require('./app')
const conn = require('./db/conn')

const PORT = 3000
const hostname = 'localhost'

const express = require('express')
const cors = require('cors')

require('./model/rel')

const authMiddleware = require('./middleware/auth.middleware')
const auth = require('./controller/auth.controller')
const funcionario = require('./controller/funcionario.controller')
const motorista = require('../controller/motorista.controller')
const carga = require('./controller/carga.controller')
const entrega = require('./controller/entrega.controller')

const app = express()
app.use(cors())
app.use(express.json())

// ----- rotas públicas -----
app.get('/', (req, res) => res.status(200).json({ message: 'Sistema de Cargas rodando!' }))
app.post('/login', auth.login)

// ----- rotas privadas (exigem token válido) -----
app.use(authMiddleware)

app.post('/funcionario', funcionario.cadastrar)

app.post('/motorista', motorista.cadastrar)
app.get('/motoristas', motorista.listar)          // ?nome=
app.get('/motorista/:id', motorista.consultar)
app.put('/motorista/:id', motorista.atualizar)
app.delete('/motorista/:id', motorista.apagar)

app.post('/carga', carga.cadastrar)
app.get('/cargas', carga.listar)

app.post('/entrega', entrega.cadastrar)
app.put('/entrega/:id', entrega.atualizar)
app.get('/entregas', entrega.listar)              // ?ordem=asc|desc&status=

module.exports = app


conn.sync()
    .then(() => {
        app.listen(PORT, hostname, () => {
            console.log(`Servidor rodando em http://${hostname}:${PORT}`)
        })
    })
    .catch((err) => console.error('Erro ao conectar com o banco de dados!', err))
