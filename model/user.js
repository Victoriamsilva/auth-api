const jwt = require('jsonwebtoken');
const {execSQLQuery} = require('../database/connection')

exports.postUser = async ({name, email, password }) => {
    const query = `INSERT INTO user (email, password, name) VALUES ('${email}', '${password}', '${name}')`
    const user = await execSQLQuery(query);
    console.log(user)
    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: 30000
    })
    return { data: { user, token }, status: 201 }

}

exports.loginUser = async ({ email, password }) => {
    const data = await execSQLQuery(`SELECT * FROM user WHERE email='${email}'`);
    if (data[0] && data[0].password === password) {
        const token = jwt.sign({ id: data[0].id }, process.env.SECRET, {
            expiresIn: 30000
        });
        return { data: { token, ...data[0] }, status: 200 }
    } else {
        return { data: { message: "Usuário ou senha inválido" }, status: 401 }
    }
}

exports.getEmail = async (email) => {
    const user = await execSQLQuery(`SELECT * FROM user WHERE email='${email}'`);
    return { user, status: 200 }
}

