const { Op } = require('sequelize')
const Motorista = require('../model/Motorista')
const Carga = require('../model/Carga')
const { criptografar, descriptografar } = require('../middleware/crypto')

const apenasDigitos = (v) => String(v ?? '').replace(/\D/g, '')

// Nunca devolve CNH/CPF criptografados: descriptografa antes de responder
const paraResposta = (m) => ({
    codMotorista: m.codMotorista,
    nome: m.nome,
    cnh: descriptografar(m.cnh),
    cpf: descriptografar(m.cpf),
    telefone: m.telefone
})

function validar({ nome, cnh, cpf, telefone }) {
    if (!nome || !cnh || !cpf || !telefone) return 'Todos os campos são obrigatórios!'
    if (apenasDigitos(cpf).length !== 11) return 'CPF deve ter 11 dígitos!'
    if (apenasDigitos(cnh).length !== 11) return 'CNH deve ter 11 dígitos!'
    return null
}

const cadastrar = async (req, res) => {
    const erro = validar(req.body)
    if (erro) return res.status(400).json({ message: erro })

    try {
        const { nome, cnh, cpf, telefone } = req.body
        const novo = await Motorista.create({
            nome,
            cnh: criptografar(apenasDigitos(cnh)),
            cpf: criptografar(apenasDigitos(cpf)),
            telefone
        })
        return res.status(201).json({ message: 'Motorista cadastrado com sucesso!', codMotorista: novo.codMotorista })
    } catch (err) {
        console.error('Erro ao cadastrar motorista:', err)
        return res.status(500).json({ message: 'Erro ao cadastrar motorista!' })
    }
}

// GET /motoristas?nome=ana  -> lista todos ou filtra por nome
const listar = async (req, res) => {
    try {
        const where = req.query.nome ? { nome: { [Op.like]: `%${req.query.nome}%` } } : {}
        const motoristas = await Motorista.findAll({ where, order: [['nome', 'ASC']] })
        return res.status(200).json(motoristas.map(paraResposta))
    } catch (err) {
        console.error('Erro ao listar motoristas:', err)
        return res.status(500).json({ message: 'Erro ao listar motoristas!' })
    }
}

const consultar = async (req, res) => {
    try {
        const motorista = await Motorista.findByPk(req.params.id)
        if (!motorista) return res.status(404).json({ message: 'Motorista não encontrado!' })
        return res.status(200).json(paraResposta(motorista))
    } catch (err) {
        console.error('Erro ao consultar motorista:', err)
        return res.status(500).json({ message: 'Erro ao consultar motorista!' })
    }
}

const atualizar = async (req, res) => {
    const erro = validar(req.body)
    if (erro) return res.status(400).json({ message: erro })

    try {
        const motorista = await Motorista.findByPk(req.params.id)
        if (!motorista) return res.status(404).json({ message: 'Motorista não encontrado!' })

        const { nome, cnh, cpf, telefone } = req.body
        await motorista.update({
            nome,
            cnh: criptografar(apenasDigitos(cnh)),
            cpf: criptografar(apenasDigitos(cpf)),
            telefone
        })
        return res.status(200).json({ message: 'Motorista atualizado com sucesso!' })
    } catch (err) {
        console.error('Erro ao atualizar motorista:', err)
        return res.status(500).json({ message: 'Erro ao atualizar motorista!' })
    }
}

const apagar = async (req, res) => {
    try {
        const motorista = await Motorista.findByPk(req.params.id)
        if (!motorista) return res.status(404).json({ message: 'Motorista não encontrado!' })

        const cargas = await Carga.count({ where: { idMotorista: motorista.codMotorista } })
        if (cargas > 0) {
            return res.status(409).json({ message: 'Motorista possui cargas vinculadas e não pode ser excluído!' })
        }

        await motorista.destroy()
        return res.status(200).json({ message: 'Motorista excluído com sucesso!' })
    } catch (err) {
        console.error('Erro ao excluir motorista:', err)
        return res.status(500).json({ message: 'Erro ao excluir motorista!' })
    }
}

module.exports = { cadastrar, listar, consultar, atualizar, apagar }
