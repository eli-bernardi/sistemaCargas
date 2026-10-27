const Carga = require('./Carga')
const Entrega = require('./Entrega')
const Funcionario = require('./Funcionario')
const Motorista = require('./Motorista')

Entrega.belongsTo(Carga, {
    foreignKey: 'idCarga',
    as: 'cargaEntrega',
    onDelete: 'CASCADE'
})

Carga.hasMany(Entrega, {
    foreignKey: 'idCarga',
    as: 'entregaCarga',
    allowNull: false
})


Motorista.belongsTo(Entrega, {
    foreignKey: 'idMotorista',
    as: 'entregaMotorista',
    onDelete: 'CASCADE'
})

Entrega.hasMany(Motorista, {
    foreignKey: 'idMotorista',
    as: 'motoristaCarga',
    allowNull: false
})

module.exports = { Carga, Entrega, Funcionario, Motorista }