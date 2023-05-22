const { putUser, getUsers, postUser, getOneUser, removeUser, loginUser } = require('../model/user')

exports.get = async (req, res) => {
    try {
        let { limit = 10, page = 0 } = req.query
        const { data: response, status } = await getUsers(Number(page), Number(limit))
        res.status(status).json(response)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Erro inesperado' })
    }
}

exports.post = async (req, res) => {
    try {
        const response = await postUser(req.body)
        res.status(response.status).json(response.data)
    } catch (error) {
        console.log(error)
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

exports.getOne = async (req, res) => {
    try {
        const response = await getOneUser(req.params.id)
        res.status(response.status).json(response.data)
    } catch (error) {
        return res.status(500).json({ message: 'Erro inesperado' })
    }
}

exports.put = async (req, res) => {
    try {
        const response = await putUser(req.params.id, req.body)
        res.status(response.status).json(response.data)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Erro inesperado' })
    }
}

exports.remove = async (req, res) => {
    try {
        const response = await removeUser(req.params.id)
        res.status(response.status).json(response.data)
    } catch (error) {
        return res.status(500).json({ message: 'Erro inesperado' })
    }
}

