const { Sequelize } = require('sequelize')

const db = new Sequelize('db_logistica', 'root', 'senai', {
    dialect: 'mysql',
    port: 3306,
    host: 'localhost'
})

module.exports = db