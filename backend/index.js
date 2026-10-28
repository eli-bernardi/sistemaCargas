const express = require('express')
const cors = require('cors')

const app = express()
const conn = require('./db/conn')

const PORT = 3000
const hostname = 'localhost'


require('./model/rel')

const authMiddleware = require('./middleware/auth.middleware')
const auth = require('./controller/auth.controller')
const funcionario = require('./controller/funcionario.controller')
const motorista = require('../controller/motorista.controller')
const carga = require('./controller/carga.controller')
const entrega = require('./controller/entrega.controller')


app.use(cors())
app.use(express.json())

//Rotas públicas
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Sistema de Cargas rodando!' })
})

app.post('/login', auth.login)

//Rotas Privadas
app.use(authMiddleware)

app.post('/funcionario', funcionario.cadastrar)

app.post('/motorista/cadastrar', motorista.cadastrar)
app.get('/motorista/listar', motorista.listar)
app.get('/motorista/consultar/:id', motorista.consultar)
app.put('/motorista/atualizar/:id', motorista.atualizar)
app.delete('/motorista/apagar/:id', motorista.apagar)

app.post('/carga/cadastrar', carga.cadastrar)
app.get('/carga/listar', carga.listar)

app.post('/entrega/cadastrar', entrega.cadastrar)
app.put('/entrega/atualizar/:id', entrega.atualizar)
app.get('/entrega/listar', entrega.listar)


conn.sync()
    .then(() => {
        app.listen(PORT, hostname, () => {
            console.log(`Servidor rodando em http://${hostname}:${PORT}`)
        })
    })
    .catch((err) => console.error('Erro ao conectar com o banco de dados!', err))
