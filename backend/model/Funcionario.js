const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Funcionario = db.define('funcionario', {
    codFuncionario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(255),
        allowNull: False
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: False
    },
    senha: {
        type: DataTypes.STRING(255),
        allowNull: False
    }
}, {
    timestamps: false,
    tableName: 'Funcionarios'
})

module.exports = Funcionario