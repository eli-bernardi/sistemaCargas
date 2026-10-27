const Funcionario = require('../model/Funcionario')
const { criptografar } = require('../middleware/crypto')

const cadastrar = async (req, res) => {
    const { nome, email, senha } = req.body

    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
    }

    try {
        const existe = await Funcionario.findOne({ where: { email } })
        if (existe) {
            return res.status(409).json({ message: 'E-mail já cadastrado!' })
        }

        await Funcionario.create({ nome, email, senha: criptografar(senha) })
        return res.status(201).json({ message: 'Funcionário cadastrado com sucesso!' })
    } catch (err) {
        console.error('Erro ao cadastrar funcionário:', err)
        return res.status(500).json({ message: 'Erro ao cadastrar funcionário!' })
    }
}

module.exports = { cadastrar }
