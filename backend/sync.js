// Recria as tabelas do db_logistica (CUIDADO: apaga os dados existentes)
const db = require('./db/conn')
require('./model/rel')

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
