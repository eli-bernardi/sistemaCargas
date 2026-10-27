const CryptoJS = require('crypto-js')
const Funcionario = require('../model/Funcionario')
const secretKey = 'Gabriela_S2'

const login = async (req, res) => {
    const valores = req.body

    if (!valores.email || !valores.senha) {
        return res.status(401).json({ message: 'Email ou senha incorreto!' })
    }

    try {
        const funcionario = await Funcionario.findOne({ where })

        if (!funcionario) {
            return res.status(401).json({ message: 'Funcionário não encontrado!' })
        }

        const bytes = CryptoJS.AES.encrypt(valores.senha, secretKey).toString()
        const senhaDescripto = bytes.toString(CryptoJS.enc.Utf8)

        if (valores.senha !== senhaDescripto) {
            return res.status(401).json({ message: 'Senhas não conferem!' })
        }

        const tresHorasEmMs = 3 * 3600 * 1000
        const tempoExpirar = Date.now() + tresHorasEmMs

        const payload = {
            idFuncionario: funcionario.idFuncionario,
            nome: funcionario.nome,
            expirarEm: tempoExpirar
        }

        const token = CryptoJS.AES.encrypt(JSON.stringify(payload), secretKey).toString()

        return res.status(200).json({
            message: 'Login realizado com sucesso',
            nome: funcionario.nome,
            token: token
        })
    } catch (err) {
        console.log('Erro na operação!', err)
        return res.status(500).json({ message: 'Erro na operação!' })
    }
}

module.exports = { login }