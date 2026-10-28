const db = require('./db/conn')
const { Carga, Entrega, Funcionario, Motorista } = require('./model/rel')

async function syncDataBase() {
    try {
        await db.sync({ force: true })
        console.log('Tabelas sincronizadas!')
    } catch (err) {
        console.error('Erro ao sincronizar as tabelas', err)
    } finally {
        await db.close()
    }
}

syncDataBase()
