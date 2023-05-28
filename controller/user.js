const { postUser, loginUser } = require('../model/user')

exports.post = async (req, res) => {
    try {
        const response = await postUser(req.body)
        res.status(response.status).json(response.data)
    } catch (error) {
        return res.status(500).json({ message: 'Erro inesperado' })
    }
}

exports.login = async (req, res) => {
    try {
        const response = await loginUser(req.body)
        res.status(response.status).json(response.data)
    } catch (error) {
        return res.status(500).json({ message: 'Erro inesperado' })
    }
}
