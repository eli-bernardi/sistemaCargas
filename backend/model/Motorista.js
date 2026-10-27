const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Motorista = db.define('motorista', {
    codMotorista: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(255),
        allowNull: False
    },
    cnh: {
        type: DataTypes.STRING(255),
        allowNull: False
    },
    cpf: {
        type: DataTypes.STRING(255),
        allowNull: False
    }
}, {
    timestamps: false,
    tableName: 'Motoristas'
})

module.exports = Motorista