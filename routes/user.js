const express = require("express")
const router = express.Router()
const controller = require("../controller/user")
const { validateErrorUser, validateEmail, verifyJWT, validateId, validateGetOne, validateUserFields } = require('../middleware/user')

router.get('/users', verifyJWT, controller.get)
router.post('/cadastro', validateUserFields, validateErrorUser, validateEmail, controller.post)
router.post('/login', validateUserFields, validateErrorUser, controller.login)

module.exports = router;