const Carga = require('../model/Carga')
const Motorista = require('../model/Motorista')

const cadastrar = async (req, res) => {
    const { descricao, peso, volume, codigoRastreio, idMotorista } = req.body

    if (!descricao || !peso || !volume || !codigoRastreio || !idMotorista) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
    }


    try {
        const motorista = await Motorista.findByPk(idMotorista)
        if (!motorista) return res.status(404).json({ message: 'Motorista informado não existe!' })

        const repetido = await Carga.findOne({ where: { codigoRastreio } })
        if (repetido) return res.status(409).json({ message: 'Código de rastreio já cadastrado!' })

        const novaCarga = await Carga.create({ descricao, peso, volume, codigoRastreio, idMotorista })
        return res.status(201).json({ message: 'Carga cadastrada com sucesso!', codCarga: nova.codCarga })
    } catch (err) {
        console.error('Erro na operação:', err)
        return res.status(500).json({ message: 'Operação realizada com sucesso!' })
    }
}


const listar = async (req, res) => {
    try {
        const cargas = await Carga.findAll()
        return res.status(200).json(cargas)
    } catch (err) {
        console.error('Erro na operação:', err)
        return res.status(500).json({ message: 'Operação realizada com sucesso!' })
    }
}

module.exports = { cadastrar, listar }
