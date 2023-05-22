const { body, param, validationResponse, validationResult } = require('express-validator')
const { getOneUser, getUsers, getEmail } = require('../model/user')
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

const res = require('express/lib/response');

exports.validateId = [
    param('id').notEmpty().custom((value) => ObjectId.isValid(value))
]

exports.validateUserFields = [
    body('senha').trim().notEmpty().isString(),
    body('email').trim().notEmpty().isEmail()
]

exports.validateErrorUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    return next()
}

exports.validateEmail = async (req, res, next) => {
    const { email } = req.body
    const { data } = await getEmail(email)
    if (data) return res.status(400).json({ message: 'E-mail já existente.' })
    return next()
}

exports.verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

        req.userId = decoded.id;
        next();
    });
}