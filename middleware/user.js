const { body, validationResult } = require('express-validator')
const {  getEmail } = require('../model/user')

exports.validateUserFields = [
    body('name').trim().isString(),
    body('password').trim().notEmpty().isString(),
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
    const {user} = await getEmail(email)
    if ( user && user.length > 0) return res.status(400).json({ message: 'E-mail já existente.' })
    return next()
}
