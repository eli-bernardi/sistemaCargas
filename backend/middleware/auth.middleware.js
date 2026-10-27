const { descriptografar } = require('./crypto')

function authMiddleware(req, res, next) {
    const token = req.headers['authorization']

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado!' })
    }

    try {
        const dados = descriptografar(token)
        if (!dados) {
            return res.status(401).json({ message: 'Token inválido!' })
        }

        const payload = JSON.parse(dados)

        if (Date.now() > payload.expirarEm) {
            return res.status(401).json({ message: 'Tempo da sessão expirado!' })
        }

        req.usuario = payload
        next()
    } catch (err) {
        return res.status(401).json({ message: 'Falha na autenticação!' })
    }
}

module.exports = authMiddleware
