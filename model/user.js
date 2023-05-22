const { connectMongodb } = require('../database/connection')
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

const keyPrimary = 'users'

exports.postUser = async ({ email, senha }) => {
    const { collection } = await connectMongodb('pokemonFox', 'users')
    const { insertId } = await collection.insertOne({ email, senha })
    const token = jwt.sign({ id: insertId }, process.env.SECRET, {
        expiresIn: 30000
    })
    return { data: { token, _id: insertId, email, senha }, status: 201 }
}

exports.loginUser = async ({ email, senha }) => {
    const { collection } = await connectMongodb('pokemonFox', 'users')
    const data = await collection.findOne({ email })

    if (data && data.senha === senha) {
        const token = jwt.sign({ id: data._id }, process.env.SECRET, {
            expiresIn: 30000
        });
        return { data: { token, ...data }, status: 200 }
    } else {
        return { data: { message: "Usuário ou senha inválido" }, status: 401 }

    }
}

exports.getEmail = async (email) => {
    const { collection } = await connectMongodb('usersDatabase', 'users')
    const data = await collection.findOne({ email })
    return { data, status: 200 }
}

