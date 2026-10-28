const Entrega = require('../model/Entrega')
const Carga = require('../model/Carga')


const cadastrar = async (req, res) => {
    const { cidadeDestino, status, dataHora, idCarga } = req.body

    if (!cidadeDestino || !status || !dataHora || !idCarga) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
    }
    if (!STATUS.includes(status)) {
        return res.status(400).json({ message: 'Status deve ser ENTREGUE ou TRANSITO!' })
    }
    if (isNaN(new Date(dataHora).getTime())) {
        return res.status(400).json({ message: 'Data e hora inválidas!' })
    }

    try {
        const carga = await Carga.findByPk(idCarga)
        if (!carga) return res.status(404).json({ message: 'Carga informada não existe!' })

        const nova = await Entrega.create({ cidadeDestino, status, dataHora, idCarga })
        return res.status(201).json({ message: 'Entrega cadastrada com sucesso!', codEntrega: nova.codEntrega })
    } catch (err) {
        console.error('Erro ao cadastrar entrega:', err)
        return res.status(500).json({ message: 'Erro ao cadastrar entrega!' })
    }
}

// PUT /entrega/:id  -> atualiza status (e, opcionalmente, cidade e data/hora)
const atualizar = async (req, res) => {
    const { cidadeDestino, status, dataHora } = req.body

    if (!status || !STATUS.includes(status)) {
        return res.status(400).json({ message: 'Status deve ser ENTREGUE ou TRANSITO!' })
    }
    if (dataHora && isNaN(new Date(dataHora).getTime())) {
        return res.status(400).json({ message: 'Data e hora inválidas!' })
    }

    try {
        const entrega = await Entrega.findByPk(req.params.id)
        if (!entrega) return res.status(404).json({ message: 'Entrega não encontrada!' })

        await entrega.update({
            status,
            cidadeDestino: cidadeDestino || entrega.cidadeDestino,
            dataHora: dataHora || entrega.dataHora
        })
        return res.status(200).json({ message: 'Entrega atualizada com sucesso!' })
    } catch (err) {
        console.error('Erro ao atualizar entrega:', err)
        return res.status(500).json({ message: 'Erro ao atualizar entrega!' })
    }
}

// GET /entregas?ordem=asc|desc&status=ENTREGUE|TRANSITO  -> ordenado por data
const listar = async (req, res) => {
    const ordem = String(req.query.ordem || 'asc').toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
    const where = {}
    if (req.query.status) {
        if (!STATUS.includes(req.query.status)) {
            return res.status(400).json({ message: 'Status deve ser ENTREGUE ou TRANSITO!' })
        }
        where.status = req.query.status
    }

    try {
        const entregas = await Entrega.findAll({
            where,
            include: [{ model: Carga, as: 'carga', attributes: ['codCarga', 'descricao', 'codigoRastreio'] }],
            order: [['dataHora', ordem]]
        })
        return res.status(200).json(entregas)
    } catch (err) {
        console.error('Erro ao listar entregas:', err)
        return res.status(500).json({ message: 'Erro ao listar entregas!' })
    }
}

module.exports = { cadastrar, atualizar, listar }
