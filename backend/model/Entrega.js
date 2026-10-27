const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Entrega = db.define('entrega', {
    codEntrega: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cidade: {
        type: DataTypes.STRING(255),
        allowNull: False
    },
    destino: {
        type: DataTypes.STRING(255),
        allowNull: False
    },
    status: {
        type: DataTypes.ENUM('ENTREGUE','TRANSITO'),
        allowNull: False
    },
    DATA: {
        type: DataTypes.DATE,
        allowNull: False
    },
    HORA: {
        type: DataTypes.TIME,
        allowNull: False
    },
    
    idCarga: {
        type: DataTypes.INTEGER,
        allowNull: False,
        references: {
            model: 'Cargas',
            key: 'codCargas'
        }
    }
}, {
    timestamps: false,
    tableName: 'Entregas'
})

module.exports = Entrega