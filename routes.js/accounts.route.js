const express =  require('express')
const router = express.Router()
const accounts = require('../controllers/accounts.controllers')

router.post('/register', accounts.register)
router.post('/login', accounts.login)


module.exports = router