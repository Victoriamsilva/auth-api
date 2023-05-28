const express = require("express")
const router = express.Router()
const controller = require("../controller/user")
const { validateErrorUser, validateEmail, validateUserFields } = require('../middleware/user')

router.post('/cadastro', validateUserFields, validateErrorUser, validateEmail, controller.post)
router.post('/login', validateUserFields, validateErrorUser, controller.login)

module.exports = router;