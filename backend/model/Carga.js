const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Carga = db.define('carga', {
    codCarga: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    descricao: {
        type: DataTypes.STRING(255),
        allowNull: False
    },
    peso: {
        type: DataTypes.FLOAT,
        allowNull: False
    },
    volume: {
        type: DataTypes.FLOAT,
        allowNull: False
    },
    codigoRastreio: {
        type: DataTypes.INTEGER,
        allowNull: False
    },
    idMotorista: {
        type: DataTypes.INTEGER,
        allowNull: False,
        references: {
            model: 'Motoristas',
            key: 'codMotorista'
        }
    }
}, {
    timestamps: false,
    tableName: 'Cargas'
})

module.exports = Carga